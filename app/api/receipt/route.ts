import { NextRequest, NextResponse } from 'next/server';
import { createWorker } from 'tesseract.js';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { unlink } from 'fs/promises';

// Helper function to extract ingredients and volumes from text
function extractIngredientsAndVolumes(text: string) {
  // Split text into lines
  const lines = text.split('\n');
  const ingredients: { name: string; volume: string }[] = [];
  
  // Common volume patterns
  const volumePattern = /(\d+(\.\d+)?)\s*(ml|g|kg|oz|lb|cups?|tbsp|tsp)/i;
  
  for (const line of lines) {
    const match = line.match(volumePattern);
    if (match) {
      // Extract the volume and unit
      const volume = match[0];
      // The ingredient name is likely before the volume
      const name = line.replace(volume, '').trim();
      
      if (name) {
        ingredients.push({
          name,
          volume: volume.toLowerCase()
        });
      }
    }
  }
  
  return ingredients;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Save file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempPath = join(process.cwd(), 'tmp', `${Date.now()}-${file.name}`);
    await writeFile(tempPath, buffer);

    // Initialize Tesseract.js
    const worker = await createWorker('eng');
    await worker.reinitialize('eng');

    // Perform OCR
    const { data: { text } } = await worker.recognize(tempPath);
    await worker.terminate();

    // Clean up temporary file
    await unlink(tempPath);

    // Process the OCR text to extract ingredients
    const ingredients = processReceiptText(text);

    return NextResponse.json({
      success: true,
      ingredients
    });

  } catch (error) {
    console.error('Error processing receipt:', error);
    return NextResponse.json(
      { error: 'Failed to process receipt' },
      { status: 500 }
    );
  }
}

function processReceiptText(text: string): { name: string; quantity: string; unit: string }[] {
  // Split text into lines
  const lines = text.split('\n');
  const ingredients: { name: string; quantity: string; unit: string }[] = [];

  // Common units of measurement
  const units = ['g', 'kg', 'ml', 'l', 'oz', 'lb', 'piece', 'pieces', 'pcs'];
  
  // Regular expression to match quantity patterns (e.g., "2", "2.5", "1/2")
  const quantityRegex = /(\d+(\.\d+)?)(\/\d+)?/;

  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue;

    // Try to extract quantity, unit, and item name
    const words = line.trim().split(' ');
    let quantity = '';
    let unit = '';
    let name = '';

    // Look for quantity
    const quantityMatch = line.match(quantityRegex);
    if (quantityMatch) {
      quantity = quantityMatch[0];
      words.splice(words.indexOf(quantity), 1);
    }

    // Look for unit
    const unitWord = words.find(word => units.includes(word.toLowerCase()));
    if (unitWord) {
      unit = unitWord;
      words.splice(words.indexOf(unitWord), 1);
    }

    // Remaining words are likely the item name
    name = words.join(' ').trim();

    // Only add if we have at least a name
    if (name) {
      ingredients.push({
        name,
        quantity: quantity || '1',
        unit: unit || 'piece'
      });
    }
  }

  return ingredients;
} 
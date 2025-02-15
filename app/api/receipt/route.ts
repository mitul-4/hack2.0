import { createWorker } from 'tesseract.js';
import { NextRequest, NextResponse } from 'next/server';

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
    const file = formData.get('receipt') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No receipt image provided' },
        { status: 400 }
      );
    }

    // Convert File to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Initialize Tesseract worker
    const worker = await createWorker();
    
    // Recognize text from image
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    
    const { data: { text } } = await worker.recognize(buffer);
    
    // Terminate worker
    await worker.terminate();

    // Process the extracted text to find ingredients and volumes
    const ingredients = extractIngredientsAndVolumes(text);

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
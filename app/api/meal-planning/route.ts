import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  additionalIngredients: string[];
  preparationTime: string;
  difficultyLevel: string;
  healthNotes: string;
  allergyNotes?: string;
}

export async function POST(req: NextRequest) {
  try {
    // Log request start
    console.log('Received meal planning request');

    // Parse request body
    const body = await req.json();
    console.log('Request body:', JSON.stringify(body, null, 2));

    if (!body.prompt || typeof body.prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request format. Prompt is required.' },
        { status: 400 }
      );
    }

    // Create prompt for Claude
    const prompt = `${body.prompt}

Please suggest 3 different recipes that:
1. Primarily use these ingredients
2. Require minimal additional ingredients
3. Are diverse in cuisine types
4. Match the specified effort level
5. Consider the specified mood/sentiment
6. Support any stated health goals
7. Strictly avoid any allergens mentioned

For each recipe, provide:
- Recipe name
- List of ingredients (marking which ones are additional/not in the original list)
- Detailed step-by-step instructions
- Preparation time and difficulty level
- Health benefits related to the stated goals
- Safety notes regarding allergens

Format your response as JSON matching this structure:
{
  "recipes": [
    {
      "name": "Recipe Name",
      "ingredients": ["ingredient 1", "ingredient 2"],
      "additionalIngredients": ["extra ingredient 1"],
      "instructions": ["step 1", "step 2"],
      "preparationTime": "30 minutes",
      "difficultyLevel": "easy/medium/challenging",
      "healthNotes": "How this recipe supports the health goals",
      "allergyNotes": "Notes about allergen safety and substitutions"
    }
  ]
}

Ensure the response is valid JSON and all recipes are safe and appropriate for the specified preferences.`;

    console.log('Sending request to Claude API...');

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1500,
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }],
    });

    console.log('Received response from Claude API');

    // Parse Claude's response
    let responseContent = '';
    for (const content of message.content) {
      if (content.type === 'text') {
        responseContent = content.text;
        break;
      }
    }

    if (!responseContent) {
      console.error('No text content in AI response');
      throw new Error('No valid response from AI');
    }

    try {
      const recipes = JSON.parse(responseContent);
      console.log('Successfully parsed recipes');
      return NextResponse.json({
        success: true,
        ...recipes
      });
    } catch (error: unknown) {
      console.error('Error parsing AI response:', error);
      console.error('Raw response:', responseContent);
      return NextResponse.json(
        { 
          error: 'Failed to parse AI response', 
          details: error instanceof Error ? error.message : 'JSON parse error'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in meal planning API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate meal plans',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
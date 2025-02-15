import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface Ingredient {
  name: string;
  volume: string;
}

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  additionalIngredients: string[];
}

export async function POST(req: NextRequest) {
  try {
    const { ingredients } = await req.json() as { ingredients: Ingredient[] };

    if (!ingredients || !Array.isArray(ingredients)) {
      return NextResponse.json(
        { error: 'Invalid ingredients data' },
        { status: 400 }
      );
    }

    // Format ingredients for the prompt
    const ingredientsList = ingredients
      .map(ing => `${ing.name} (${ing.volume})`)
      .join(', ');

    // Create prompt for Claude
    const prompt = `Given these ingredients: ${ingredientsList}

Please suggest 3 different recipes that:
1. Primarily use these ingredients
2. Require minimal additional ingredients
3. Are diverse in cuisine types
4. Are practical and healthy

For each recipe, provide:
- Recipe name
- List of ingredients (marking which ones are additional/not in the original list)
- Step-by-step instructions

Format your response as JSON matching this structure:
{
  "recipes": [
    {
      "name": "Recipe Name",
      "ingredients": ["ingredient 1", "ingredient 2"],
      "additionalIngredients": ["extra ingredient 1"],
      "instructions": ["step 1", "step 2"]
    }
  ]
}`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1500,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Parse Claude's response
    const responseContent = message.content[0].text;
    const recipes = JSON.parse(responseContent);

    return NextResponse.json({
      success: true,
      ...recipes
    });

  } catch (error) {
    console.error('Error generating meal plans:', error);
    return NextResponse.json(
      { error: 'Failed to generate meal plans' },
      { status: 500 }
    );
  }
} 
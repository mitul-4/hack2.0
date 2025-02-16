'use client';

import { useState } from 'react';
import RecipeToFeed from './RecipeToFeed';

interface Ingredient {
  name: string;
  volume: string;
}

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

interface AISubmitProps {
  ingredients: Ingredient[];
  preferences: {
    allergies: string;
    healthGoals: string;
    dislikes: string;
    effort: string;
    mood: string;
  };
  onResponse: (recipes: Recipe[]) => void;
}

const AISubmit: React.FC<AISubmitProps> = ({ ingredients, preferences, onResponse }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);

  const callAI = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!ingredients || ingredients.length === 0) {
        throw new Error('Please add some ingredients first');
      }

      // Format ingredients into a string
      const ingredientsList = ingredients
        .map(ing => `${ing.name} (${ing.volume})`)
        .join('\n');

      // Create the prompt string
      const prompt = `Ingredients:\n${ingredientsList}\nAllergies: ${preferences.allergies}\nHealth Goals: ${preferences.healthGoals}\nDislikes: ${preferences.dislikes}\nEffort Level: ${preferences.effort}\nMood: ${preferences.mood}`;

      const requestBody = { prompt };
      console.log('Sending request with body:', requestBody);
      console.log('Stringified body:', JSON.stringify(requestBody));

      if (!prompt.trim()) {
        throw new Error('Empty prompt generated');
      }

      const response = await fetch('/api/meal-planning', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate recipes');
      }

      if (data.success && data.recipes) {
        setGeneratedRecipes(data.recipes);
        onResponse(data.recipes);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <div className="w-full bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Step 4: Generate Meal Plan!</h2>
      <button
        onClick={callAI}
        disabled={loading}
        className="w-full max-w-md bg-[#00a36c] text-white py-2 rounded-full hover:bg-[#007f4c] disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating your meal plan...' : 'Create your meal'}
      </button>
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
    <div>
    
    
    {generatedRecipes.map((recipe, index) => (
      <div key={index} className="mt-8">
        <h3 className="text-xl font-semibold">{recipe.name}</h3>
        {/* Display recipe details */}
        <RecipeToFeed 
          recipe={recipe}
          onSuccess={() => {
            // Handle successful post
            alert('Recipe shared to feed!');
          }}
        />
      </div>
    ))}
  </div>
  </div>
  );
};

export default AISubmit;
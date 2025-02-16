'use client'
import { useState } from 'react';
import IngredientsList from '../../components/IngredientsList';
import DietaryPreferences from '../../components/DietaryPreferences';
import AISubmit from '@/components/AISubmit';
import OtherConsiderations from '@/components/OtherConsiderations';

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

interface Ingredient {
  name: string;
  volume: string;
}

const RecipeDisplay = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-2xl font-bold text-[#00a36c] mb-4">{recipe.name}</h3>
      
      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <span className="px-3 py-1 bg-gray-100 rounded-full">
          ⏱️ {recipe.preparationTime}
        </span>
        <span className="px-3 py-1 bg-gray-100 rounded-full">
          📊 {recipe.difficultyLevel}
        </span>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Ingredients:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        
        {recipe.additionalIngredients.length > 0 && (
          <div className="mt-3">
            <h4 className="text-md font-semibold text-gray-600">Additional Ingredients Needed:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {recipe.additionalIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Instructions:</h4>
        <ol className="list-decimal pl-5 space-y-2">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="leading-relaxed">{instruction}</li>
          ))}
        </ol>
      </div>

      <div className="space-y-3 text-sm">
        <div className="p-3 bg-green-50 rounded-md">
          <h4 className="font-semibold text-green-800 mb-1">Health Notes:</h4>
          <p className="text-green-700">{recipe.healthNotes}</p>
        </div>
        
        {recipe.allergyNotes && (
          <div className="p-3 bg-yellow-50 rounded-md">
            <h4 className="font-semibold text-yellow-800 mb-1">Allergy Information:</h4>
            <p className="text-yellow-700">{recipe.allergyNotes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  const [ingredients, setIngredients] = useState<{ name: string, quantity: string, unit: string }[]>([]);
  const [ingredientName, setIngredientName] = useState<string>('');
  const [ingredientQuantity, setIngredientQuantity] = useState<string>('');
  const [ingredientUnit, setIngredientUnit] = useState<string>('');

  const [allergies, setAllergies] = useState<string>('');
  const [healthGoals, setHealthGoals] = useState<string>('');
  const [dislikedIngredients, setDislikedIngredients] = useState<string>('');

  const [effort, setEffort] = useState<string>('');
  const [sentiment, setSentiment] = useState<string>('');
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);

  const addIngredient = () => {
    if (ingredientName.trim()) {
      setIngredients([...ingredients, { 
        name: ingredientName, 
        quantity: ingredientQuantity, 
        unit: ingredientUnit 
      }]);
      setIngredientName('');
      setIngredientQuantity('');
      setIngredientUnit('');
    }
  };

  const formatIngredientsForAI = (): Ingredient[] => {
    return ingredients.map(ing => ({
      name: ing.name,
      volume: `${ing.quantity} ${ing.unit}`.trim()
    }));
  };

  const handleRecipes = (recipes: Recipe[]) => {
    setGeneratedRecipes(recipes);
    console.log('Received recipes:', recipes);
  };

  return (
    <div className="min-h-screen max-w-xl flex flex-col items-center justify-center mx-auto py-8">
      <IngredientsList
        ingredientName={ingredientName}
        setIngredientName={setIngredientName}
        ingredientQuantity={ingredientQuantity}
        setIngredientQuantity={setIngredientQuantity}
        ingredientUnit={ingredientUnit}
        setIngredientUnit={setIngredientUnit}
        ingredients={ingredients}
        addIngredient={addIngredient}
      />

      <DietaryPreferences
        allergies={allergies}
        setAllergies={setAllergies}
        healthGoals={healthGoals}
        setHealthGoals={setHealthGoals}
        dislikedIngredients={dislikedIngredients}
        setDislikedIngredients={setDislikedIngredients}
        savePreferences={() => {}}
      />

      <OtherConsiderations
        effort={effort}
        setEffort={setEffort}
        sentiment={sentiment}
        setSentiment={setSentiment}
        saveConsiderations={() => {}}
      />

      <AISubmit 
        ingredients={formatIngredientsForAI()}
        preferences={{
          allergies,
          healthGoals,
          dislikes: dislikedIngredients,
          effort,
          mood: sentiment
        }}
        onResponse={handleRecipes}
      />

      {generatedRecipes.length > 0 && (
        <div className="w-full mt-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Generated Recipes</h2>
          {generatedRecipes.map((recipe, index) => (
            <RecipeDisplay key={index} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
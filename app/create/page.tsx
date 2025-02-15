// pages/index.tsx
'use client'
import { useState } from 'react';
import IngredientsList from '../../components/IngredientsList';
import DietaryPreferences from '../../components/DietaryPreferences';


const Home = () => {
  const [ingredients, setIngredients] = useState<{ name: string, quantity: string, unit: string }[]>([]);
  const [ingredientName, setIngredientName] = useState<string>('');
  const [ingredientQuantity, setIngredientQuantity] = useState<string>('');
  const [ingredientUnit, setIngredientUnit] = useState<string>('');
  
  const [allergies, setAllergies] = useState<string>('');
  const [healthGoals, setHealthGoals] = useState<string>('');
  const [dislikedIngredients, setDislikedIngredients] = useState<string>('');
  
  const addIngredient = () => {
    setIngredients([...ingredients, { name: ingredientName, quantity: ingredientQuantity, unit: ingredientUnit }]);
    setIngredientName('');
    setIngredientQuantity('');
    setIngredientUnit('');
  };

  const savePreferences = () => {
    console.log('Preferences saved:', { allergies, healthGoals, dislikedIngredients });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">AI Meal Planner</h1>

      {/* Ingredient Form */}
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

      {/* Dietary Preferences Form */}
      <DietaryPreferences 
        allergies={allergies} 
        setAllergies={setAllergies}
        healthGoals={healthGoals} 
        setHealthGoals={setHealthGoals}
        dislikedIngredients={dislikedIngredients} 
        setDislikedIngredients={setDislikedIngredients}
        savePreferences={savePreferences}
      />
    </div>
  );
};

export default Home;
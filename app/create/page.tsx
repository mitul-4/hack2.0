'use client'
import { useState } from 'react';
import IngredientsList from '../../components/IngredientsList';
import DietaryPreferences from '../../components/DietaryPreferences';
import AISubmit from '@/components/AISubmit';
import OtherConsiderations from '@/components/OtherConsiderations';

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
  const saveConsiderations = () => {
    console.log('Considerations saved:', { effort, sentiment });
  };


  const addIngredient = () => {
    setIngredients([...ingredients, { name: ingredientName, quantity: ingredientQuantity, unit: ingredientUnit }]);
    setIngredientName('');
    setIngredientQuantity('');
    setIngredientUnit('');
  };

  const savePreferences = () => {
    console.log('Preferences saved:', { allergies, healthGoals, dislikedIngredients });
  };

  const callAI = async () => {
  };

  return (
    <div className="min-h-screen max-w-xl flex flex-col items-center justify-center mx-auto">
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
        savePreferences={savePreferences}
      />

      <OtherConsiderations
        effort={effort}
        setEffort={setEffort}
        sentiment={sentiment}
        setSentiment={setSentiment}
        saveConsiderations={saveConsiderations}
      />
      
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-48 mt-4">
        <AISubmit />
      </div>
    </div>
  );
};

export default Home;
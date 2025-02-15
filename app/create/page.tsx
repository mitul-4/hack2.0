'use client'
import { useState } from 'react';
import IngredientsList from '../../components/IngredientsList';
import DietaryPreferences from '../../components/DietaryPreferences';
import AISubmit from '@/components/AISubmit';
import OtherConsiderations from '@/components/OtherConsiderations';
import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRoot,
} from "@/components/ui/steps"
import { Button, For, Group, Stack } from "@chakra-ui/react"

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
  
  const [AIResponse, setAIResponse] = useState<string>('');
  

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
    const prompt = `Ingredients: ${ingredients.map(i => `${i.quantity} ${i.unit} ${i.name}`).join(', ')}
      Allergies: ${allergies}
      Health Goals: ${healthGoals}
      Dislikes: ${dislikedIngredients}
      Effort Level: ${effort}
      Mood: ${sentiment}`;
      
    try {
      const response = await fetch('/api/meal-planning', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setAIResponse(data.response);
    } catch (error) {
      setAIResponse('Error generating recipe. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <StepsRoot>
        <StepsList>
          <StepsItem index={0} title="Add Ingredients" />
          <StepsItem index={1} title="Dietary Preferences" />
          <StepsItem index={2} title="Other Considerations" />
          <StepsItem index={3} title="Create Meal Plan!" />
        </StepsList>

        <StepsContent index={0}>Step 1</StepsContent>
        <StepsContent index={1}>Step 2</StepsContent>
        <StepsContent index={2}>Step 3</StepsContent>
        <StepsCompletedContent>
          All steps are complete!
        </StepsCompletedContent>

        <Group>
          <StepsPrevTrigger asChild>
            <Button variant="outline" size="sm">
              Prev
            </Button>
          </StepsPrevTrigger>
          <StepsNextTrigger asChild>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </StepsNextTrigger>
        </Group>
      </StepsRoot>


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
      <AISubmit 
        AIResponse={AIResponse}
        callAI={callAI}
      />
    </div>
  );
};

export default Home;
import React from 'react';

type DietaryPreferencesProps = {
  allergies: string;
  setAllergies: React.Dispatch<React.SetStateAction<string>>;
  healthGoals: string;
  setHealthGoals: React.Dispatch<React.SetStateAction<string>>;
  dislikedIngredients: string;
  setDislikedIngredients: React.Dispatch<React.SetStateAction<string>>;
  savePreferences: () => void;
};

const DietaryPreferences: React.FC<DietaryPreferencesProps> = ({
  allergies,
  setAllergies,
  healthGoals,
  setHealthGoals,
  dislikedIngredients,
  setDislikedIngredients,
  savePreferences,
}) => {
  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Step 2: Dietary Preferences</h2>
      <div className="mb-4">
        <textarea
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          placeholder="Allergies (e.g., nuts, dairy)"
          className="w-full p-2 border rounded-md mb-2"
        />
        <textarea
          value={healthGoals}
          onChange={(e) => setHealthGoals(e.target.value)}
          placeholder="Health Goals (e.g., weight loss, muscle gain)"
          className="w-full p-2 border rounded-md mb-2"
        />
        <textarea
          value={dislikedIngredients}
          onChange={(e) => setDislikedIngredients(e.target.value)}
          placeholder="Disliked Ingredients (e.g., tomatoes, onions)"
          className="w-full p-2 border rounded-md mb-4"
        />
        <button
          onClick={savePreferences}
          className="w-full bg-[#00a36c] text-white py-2 rounded-full hover:bg-[#007f4c]"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default DietaryPreferences;

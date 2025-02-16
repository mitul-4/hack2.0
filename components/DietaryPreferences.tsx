import React, { useState, useEffect } from 'react';

const CreatePage = () => {
  const [allergies, setAllergies] = useState<string>('');
  const [favIngredients, setFavIngredients] = useState<string>('');
  const [disIngredients, setDisIngredients] = useState<string>('');

  // Load dietary preferences from localStorage
  useEffect(() => {
    const storedAllergies = localStorage.getItem('allergies');
    const storedFavIngredients = localStorage.getItem('favIngredients');
    const storedDisIngredients = localStorage.getItem('disIngredients');

    if (storedAllergies) setAllergies(storedAllergies);
    if (storedFavIngredients) setFavIngredients(storedFavIngredients);
    if (storedDisIngredients) setDisIngredients(storedDisIngredients);
  }, []);

  const savePreferences = () => {
    localStorage.setItem('allergies', allergies);
    localStorage.setItem('favIngredients', favIngredients);
    localStorage.setItem('disIngredients', disIngredients);
    alert('Preferences updated!');
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg mb-6">
      <h2 className="text-2xl font-semibold mb-4">Step 2: Dietary Preferences</h2>
      <div className="space-y-4">
        <div>
          <label className="font-medium text-gray-700 pb-2 block">Allergies:</label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter allergies (e.g. nuts, seafood)"
          />
        </div>

        <div>
          <label className="font-medium text-gray-700 pb-2 block">Favorite Ingredients:</label>
          <input
            type="text"
            value={favIngredients}
            onChange={(e) => setFavIngredients(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter favorite ingredients (e.g. chicken, eggs)"
          />
        </div>

        <div>
          <label className="font-medium text-gray-700 pb-2 block">Disliked Ingredients:</label>
          <input
            type="text"
            value={disIngredients}
            onChange={(e) => setDisIngredients(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter disliked ingredients (e.g. carrots, eggplant)"
          />
        </div>
      </div>

      <button
        className="w-full bg-[#00a36c] text-white py-2 rounded-full hover:bg-[#007f4c] mt-4"
        onClick={savePreferences}
      >
        Update Preferences
      </button>
    </div>
  );
};

export default CreatePage;

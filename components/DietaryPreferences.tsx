import React, { useState, useEffect } from 'react';

const CreatePage = () => {
  const [allergies, setAllergies] = useState<string>('');
  const [FavIngredients, setFavIngredients] = useState<string>('');
  const [DisIngredients, setDisIngredients] = useState<string>('');

  // Load dietary preferences from localStorage
  useEffect(() => {
    const storedAllergies = localStorage.getItem('allergies');
    const storedFavIngredients = localStorage.getItem(`FavIngredients`);
    const storedDisIngredients = localStorage.getItem(`DisIngredients`);

    
    if (storedAllergies) setAllergies(storedAllergies);
    if (storedFavIngredients) setFavIngredients(storedFavIngredients);
    if (storedDisIngredients) setDisIngredients(storedDisIngredients);

  }, []);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Step 2: Dietary Preferences</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="font-medium text-gray-700 pb-4">Allergies:</p>
          <p className="text-gray-500">{allergies || 'Not set'}</p>
        </div>
        
        <div className="flex justify-between">
          <p className="font-medium text-gray-700 pb-4">Favourite Ingredients:</p>
          <p className="text-gray-500">{FavIngredients || 'Not set'}</p>
        </div>

        <div className="flex justify-between">
          <p className="font-medium text-gray-700 pb-4">Disliked Ingredients:</p>
          <p className="text-gray-500">{DisIngredients || 'Not set'}</p>
        </div>

      </div> {/* Closing div for space-y-4 */}
      
      <button
        className="w-full bg-[#00a36c] text-white py-2 rounded-full hover:bg-[#007f4c]"
        onClick={() => alert('Generate meal plan based on preferences')}
      >
        Update Preferences
      </button>
    </div>
  );
};

export default CreatePage;
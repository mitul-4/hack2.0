import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [allergies, setAllergies] = useState<string>('');
  const [FavIngredients, setFavIngredients] = useState<string>('');
  const [DisIngredients, setDisIngredients] = useState<string>('');
  

  // Load stored preferences from localStorage
  useEffect(() => {
    const storedAllergies = localStorage.getItem('allergies');
    const storedFavIngredients = localStorage.getItem('FavIngredients');
    const storedDisIngredients = localStorage.getItem('DisIngredients');


    if (storedAllergies) setAllergies(storedAllergies);
    if (storedFavIngredients) setFavIngredients(storedFavIngredients);
    if (storedDisIngredients) setDisIngredients(storedDisIngredients);
  }, []);

  const savePreferences = () => {
    localStorage.setItem('allergies', allergies);
    localStorage.setItem('FavIngredients', FavIngredients);
    alert('Preferences saved!');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Dietary Preferences</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="font-medium text-gray-700">Allergies:</p>
          <p className="text-gray-500">None</p>
        </div>

        <div className="flex justify-between">
          <p className="font-medium text-gray-700">Liked Ingredients:</p>
          <p className="text-gray-500">Chicken</p>
        </div>

        <div className="flex justify-between">
          <p className="font-medium text-gray-700">Disliked Ingredients:</p>
          <p className="text-gray-500">Mushrooms, Onions</p>
        </div>
      </div>

      {/* Update Preferences Button */}
      <div className="mt-6 text-center">
      <button className="px-6 py-2 bg-[#00a36c] text-white rounded-lg font-semibold hover:bg-[#007f4c] transition duration-200">
        Update Preferences
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

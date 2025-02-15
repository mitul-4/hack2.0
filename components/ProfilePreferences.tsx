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
    <div className="w-full bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Profile: Dietary Preferences</h2>
      <div className="mb-4">
        <textarea
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          placeholder="Allergies (e.g., nuts, dairy)"
          className="w-full p-2 border rounded-md mb-2"
        />
    
        <textarea
          value={FavIngredients}
          onChange={(e) => setFavIngredients(e.target.value)}
          placeholder="Favourite Ingredients"
          className="w-full p-2 border rounded-md mb-2"
        />
        <textarea
          value={DisIngredients}
          onChange={(e) => setDisIngredients(e.target.value)}
          placeholder="Disliked Ingredients"
          className="w-full p-2 border rounded-md mb-2"
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

export default ProfilePage;

const DietaryPreferences = () => {
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

export default DietaryPreferences;

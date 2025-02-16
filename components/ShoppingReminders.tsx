import { useState } from "react";

const ShoppingListReminders = () => {
  // State to hold the list of ingredients
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>("");

  // Function to add a new ingredient to the list
  const addIngredient = () => {
    if (newIngredient.trim() !== "") {
      setIngredients((prev) => [...prev, newIngredient]);
      setNewIngredient(""); // Clear input after adding
    }
  };

  // Function to handle the checkbox status for an ingredient
  const toggleIngredient = (index: number) => {
    setIngredients((prev) => {
      const newIngredients = [...prev];
      newIngredients[index] = newIngredients[index] + " (Bought)"; // Add '(Bought)' to indicate it's purchased
      return newIngredients;
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Shopping List Reminders</h2>
      <p>Get reminders for missing ingredients and check off items once bought.</p>

      {/* Input to add ingredients */}
      <div className="mt-4 mb-6">
        <input
          type="text"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          placeholder="Enter ingredient"
          className="w-full p-2 border rounded-md mb-2"
        />
        <button
          onClick={addIngredient}
          className="w-full bg-[#00a36c] text-white py-2 rounded-full hover:bg-[#007f4c]"
        >
          Add Ingredient
        </button>
      </div>

      {/* Shopping List with Checkboxes */}
      <div>
        <h3 className="font-semibold text-lg">Ingredients to Buy:</h3>
        <ul className="space-y-2 mt-4">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-center">
              <input
                type="checkbox"
                onChange={() => toggleIngredient(index)}
                className="mr-2"
              />
              <span
                className={`${
                  ingredient.includes("(Bought)") ? "line-through text-gray-500" : ""
                }`}
              >
                {ingredient}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShoppingListReminders;
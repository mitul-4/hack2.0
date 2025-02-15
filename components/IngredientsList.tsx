import React from 'react';

type IngredientsListProps = {
  ingredientName: string;
  setIngredientName: React.Dispatch<React.SetStateAction<string>>;
  ingredientQuantity: string;
  setIngredientQuantity: React.Dispatch<React.SetStateAction<string>>;
  ingredientUnit: string;
  setIngredientUnit: React.Dispatch<React.SetStateAction<string>>;
  ingredients: { name: string, quantity: string, unit: string }[];
  addIngredient: () => void;
};

const IngredientsList: React.FC<IngredientsListProps> = ({
  ingredientName,
  setIngredientName,
  ingredientQuantity,
  setIngredientQuantity,
  ingredientUnit,
  setIngredientUnit,
  ingredients,
  addIngredient,
}) => {
  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4">Your Ingredients:</h2>
      <div className="mb-4">
        <input
          type="text"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          placeholder="Ingredient name"
          className="w-full p-2 border rounded-md mb-2"
        />
        <input
          type="number"
          value={ingredientQuantity}
          onChange={(e) => setIngredientQuantity(e.target.value)}
          placeholder="Quantity"
          className="w-full p-2 border rounded-md mb-2"
        />
        <input
          type="text"
          value={ingredientUnit}
          onChange={(e) => setIngredientUnit(e.target.value)}
          placeholder="Unit (e.g., grams)"
          className="w-full p-2 border rounded-md mb-4"
        />
        <button
          onClick={addIngredient}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Add Ingredient
        </button>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Ingredients List:</h3>
        <ul className="list-disc pl-5">
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.quantity} {ingredient.unit} of {ingredient.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IngredientsList;
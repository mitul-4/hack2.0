'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Recipe {
  _id: string;
  name: string;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  instructions: string[];
  healthInfo?: string;
  difficulty?: string;
  cookingTime?: number;
  createdAt: string;
}

export default function RecipesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchRecipes()
    }
  }, [status, router])

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes')
      const data = await response.json()
      
      if (data.success) {
        setRecipes(data.recipes)
      } else {
        setError(data.error || 'Failed to fetch recipes')
      }
    } catch (error) {
      setError('Failed to fetch recipes')
    } finally {
      setLoading(false)
    }
  }

  const deleteRecipe = async (recipeId: string) => {
    try {
      const response = await fetch('/api/recipes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipeId }),
      })

      const data = await response.json()
      
      if (data.success) {
        setRecipes(recipes.filter(recipe => recipe._id !== recipeId))
      } else {
        setError(data.error || 'Failed to delete recipe')
      }
    } catch (error) {
      setError('Failed to delete recipe')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Saved Recipes</h1>
      
      {recipes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          You haven't saved any recipes yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">{recipe.name}</h2>
                
                {recipe.difficulty && (
                  <div className="text-sm text-gray-500 mb-2">
                    Difficulty: {recipe.difficulty}
                  </div>
                )}
                
                {recipe.cookingTime && (
                  <div className="text-sm text-gray-500 mb-4">
                    Cooking Time: {recipe.cookingTime} minutes
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-medium mb-2">Ingredients:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.name} ({ingredient.quantity} {ingredient.unit})
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Instructions:</h3>
                  <ol className="list-decimal list-inside text-gray-600">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="mb-1">
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>

                {recipe.healthInfo && (
                  <div className="mt-4 text-sm text-gray-600">
                    <h3 className="font-medium mb-1">Health Information:</h3>
                    <p>{recipe.healthInfo}</p>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => deleteRecipe(recipe._id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete Recipe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 
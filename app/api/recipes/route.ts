import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/app/lib/mongodb';
import { User } from '@/app/models/User';

// GET user's saved recipes
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email: session.user.email })
      .select('savedRecipes');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      recipes: user.savedRecipes || []
    });

  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}

// POST save a new recipe
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const recipe = await req.json();

    // Validate recipe data
    if (!recipe.name || !recipe.ingredients || !recipe.instructions) {
      return NextResponse.json(
        { error: 'Missing required recipe fields' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Add recipe to user's saved recipes
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        $push: { 
          savedRecipes: {
            ...recipe,
            createdAt: new Date()
          }
        }
      },
      { new: true }
    ).select('savedRecipes');

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      recipe: updatedUser.savedRecipes[updatedUser.savedRecipes.length - 1]
    });

  } catch (error) {
    console.error('Error saving recipe:', error);
    return NextResponse.json(
      { error: 'Failed to save recipe' },
      { status: 500 }
    );
  }
}

// DELETE a saved recipe
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { recipeId } = await req.json();

    if (!recipeId) {
      return NextResponse.json(
        { error: 'Recipe ID is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        $pull: { 
          savedRecipes: { _id: recipeId }
        }
      },
      { new: true }
    ).select('savedRecipes');

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Recipe deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting recipe:', error);
    return NextResponse.json(
      { error: 'Failed to delete recipe' },
      { status: 500 }
    );
  }
} 
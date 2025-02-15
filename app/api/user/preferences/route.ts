import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '@/app/lib/mongodb'
import { User } from '@/app/models/User'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { preferences } = await req.json()

    if (!Array.isArray(preferences)) {
      return NextResponse.json(
        { error: 'Invalid preferences format' },
        { status: 400 }
      )
    }

    await dbConnect()

    // Update user's dietary preferences
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        $set: { 
          dietaryPreferences: preferences.map(type => ({ type }))
        }
      },
      { new: true }
    )

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      preferences: user.dietaryPreferences
    })

  } catch (error) {
    console.error('Error updating preferences:', error)
    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 500 }
    )
  }
} 
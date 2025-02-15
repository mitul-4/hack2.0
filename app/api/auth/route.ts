import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Helper function to generate JWT token
function generateToken(userId: number) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' });
}

export async function POST(req: NextRequest) {
  try {
    const { action, email, password, name, dietaryPreferences } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Registration
    if (action === 'register') {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          dietaryPreferences: {
            create: dietaryPreferences?.map((pref: string) => ({
              type: pref
            })) || []
          }
        },
        include: {
          dietaryPreferences: true
        }
      });

      // Generate token
      const token = generateToken(user.id);

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          dietaryPreferences: user.dietaryPreferences
        }
      });
    }

    // Login
    if (action === 'login') {
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          dietaryPreferences: true,
          inventory: true
        }
      });

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Verify password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Generate token
      const token = generateToken(user.id);

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          dietaryPreferences: user.dietaryPreferences,
          inventory: user.inventory
        }
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
} 
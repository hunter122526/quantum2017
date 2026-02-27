/**
 * Signup API Route
 * Creates a new user account in the database
 */

import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/db-auth';
import { createJWT } from '@/lib/jwt';
import { logAuditAction } from '@/lib/db-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Create user
    const user = await createUser({
      email,
      password,
      name,
      role: 'user',
      plan: 'Starter',
    });

    // Create JWT token
    const token = await createJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Log audit action
    await logAuditAction({
      userId: user.id,
      action: 'user_signup',
      entityType: 'user',
      entityId: user.id,
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
    });

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          plan: user.plan,
        },
        token,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);

    if (error.message === 'Email already exists') {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

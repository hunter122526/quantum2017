/**
 * Login API Route
 * Authenticates a user and returns a JWT token
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getUserWithPassword,
  verifyPassword,
  updateLastLogin,
  logAuditAction,
} from '@/lib/db-auth';
import { createJWT } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get user with password hash
    const user = await getUserWithPassword(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const passwordMatches = await verifyPassword(password, user.password_hash);
    if (!passwordMatches) {
      // Log failed login attempt
      await logAuditAction({
        action: 'login_failed',
        entityType: 'user',
        entityId: user.id,
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      });

      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if account is active
    if (user.status === 'Cancelled') {
      return NextResponse.json(
        { error: 'Account has been cancelled' },
        { status: 403 }
      );
    }

    // Update last login
    await updateLastLogin(user.id);

    // Create JWT token
    const token = await createJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Log successful login
    await logAuditAction({
      userId: user.id,
      action: 'login',
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
          status: user.status,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

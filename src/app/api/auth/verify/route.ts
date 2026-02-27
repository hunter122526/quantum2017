/**
 * Verify token / Get current user API Route
 * Returns the current authenticated user information
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/jwt';
import { getUserById, getSubscription } from '@/lib/db-auth';

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const payload = await verifyJWT(token);

    if (!payload) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    // Get user from database
    const user = await getUserById(payload.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get latest subscription
    const subscription = await getSubscription(user.id);

    return NextResponse.json(
      {
        user: {
          ...user,
          subscription: subscription || undefined,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Verify token error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

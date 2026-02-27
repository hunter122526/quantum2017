/**
 * JWT Token utilities for session and authentication management
 */

import { jwtVerify, SignJWT } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
);

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'admin' | 'user';
  iat?: number;
  exp?: number;
}

/**
 * Create a JWT token for a user
 */
export async function createJWT(
  payload: Omit<JWTPayload, 'iat' | 'exp'>,
  expiresIn: string = '7d'
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresIn)
    .sign(secret);
}

/**
 * Verify and decode a JWT token
 */
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Create a short-lived access token and a long-lived refresh token
 */
export async function createTokenPair(payload: Omit<JWTPayload, 'iat' | 'exp'>) {
  const accessToken = await createJWT(payload, '1h'); // Short-lived
  const refreshToken = await createJWT(payload, '7d'); // Long-lived

  return { accessToken, refreshToken };
}

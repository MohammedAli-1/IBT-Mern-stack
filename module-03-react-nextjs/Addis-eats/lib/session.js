/**
 * lib/session.js
 * Session read/write helpers for server components, actions, and API routes.
 * Server-only — never import from client components.
 */
import 'server-only';
import { cookies } from 'next/headers';
import { signToken, verifyToken } from './session-token';
import { COOKIE_NAME, SESSION_LIFETIME_SECONDS } from './constants';

export { COOKIE_NAME };

/**
 * Create and set a signed session cookie for the given user.
 * @param {{ id: string, name: string, email: string, role: string }} user
 */
export async function createSession(user) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    iat: now,
    exp: now + SESSION_LIFETIME_SECONDS,
  };
  const token = signToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_LIFETIME_SECONDS,
  });
}

/**
 * Read and verify the current session from cookies.
 * Returns the session payload or null.
 * @returns {{ sub: string, name: string, email: string, role: string, exp: number } | null}
 */
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) return null;
  return payload;
}

/**
 * Clear the session cookie (sign-out).
 */
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

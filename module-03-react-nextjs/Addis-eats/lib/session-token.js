/**
 * lib/session-token.js
 * Low-level HMAC-SHA-256 session token helpers.
 * Server-only — never import from client components.
 */
import 'server-only';
import { createHmac } from 'crypto';
import { SESSION_LIFETIME_SECONDS } from './constants';

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET environment variable is not set.');
  return secret;
}

/**
 * Sign a payload object into a compact token: base64(payload).signature
 */
export function signToken(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = createHmac('sha256', getSecret()).update(data).digest('base64url');
  return `${data}.${sig}`;
}

/**
 * Verify and decode a token. Returns the payload or null on failure.
 */
export function verifyToken(token) {
  if (typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [data, sig] = parts;
  const expected = createHmac('sha256', getSecret()).update(data).digest('base64url');
  // Constant-time comparison to prevent timing attacks
  if (sig.length !== expected.length) return null;
  let mismatch = 0;
  for (let i = 0; i < sig.length; i++) {
    mismatch |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  if (mismatch !== 0) return null;
  try {
    return JSON.parse(Buffer.from(data, 'base64url').toString());
  } catch {
    return null;
  }
}

// re-export for consumers that previously imported from here
export { SESSION_LIFETIME_SECONDS } from './constants';

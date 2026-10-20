/**
 * lib/users.js
 * User lookup and credential verification.
 * Server-only.
 */
import 'server-only';
import { createHash } from 'crypto';
import usersData from '../data/users.json';

/**
 * Hash a plaintext password with SHA-256.
 * In production replace with bcrypt or argon2.
 */
function hashPassword(plaintext) {
  return createHash('sha256').update(plaintext).digest('hex');
}

/**
 * Find a user by email and verify the password.
 * Returns the user (without the hash) or null.
 */
export function verifyCredentials(email, password) {
  if (!email || !password) return null;
  const user = usersData.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (!user) return null;
  const hash = hashPassword(password);
  if (hash !== user.passwordHash) return null;
  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
}

/**
 * Find a user by ID. Returns the user without the password hash, or null.
 */
export function getUserById(id) {
  const user = usersData.find((u) => u.id === id);
  if (!user) return null;
  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
}

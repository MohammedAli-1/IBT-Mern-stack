/**
 * lib/constants.js
 * Shared constants that are safe to import in any runtime, including Edge.
 * No server-only imports here.
 */
export const COOKIE_NAME = 'addis_eats_session';
export const SESSION_LIFETIME_SECONDS = 7 * 24 * 60 * 60; // 7 days

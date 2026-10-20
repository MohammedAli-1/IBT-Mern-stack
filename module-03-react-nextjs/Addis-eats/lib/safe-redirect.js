/**
 * lib/safe-redirect.js
 * Validates a redirect destination so we never send users off-site.
 */

const FALLBACK = '/orders';

/**
 * Returns a safe internal redirect path.
 * Rejects anything that isn't a plain internal path starting with /.
 *
 * Defences:
 *  - Must start with / but NOT // (protocol-relative)
 *  - Must not contain a protocol like https:
 *  - Must not contain backslashes (Windows redirect tricks)
 *  - Parsed URL origin must match the app's own origin (when possible)
 *  - Empty or missing values fall back to FALLBACK
 */
export function safeRedirect(destination, fallback = FALLBACK) {
  if (!destination || typeof destination !== 'string') return fallback;

  const trimmed = destination.trim();

  // Reject protocol-relative URLs (//example.com)
  if (trimmed.startsWith('//')) return fallback;

  // Reject backslash tricks (\example.com or /\example.com)
  if (trimmed.includes('\\')) return fallback;

  // Reject anything with a protocol
  if (/^[a-zA-Z][a-zA-Z0-9+\-.]*:/.test(trimmed)) return fallback;

  // Must start with /
  if (!trimmed.startsWith('/')) return fallback;

  // Verify the parsed origin matches our app when APP_URL is available
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  try {
    const resolved = new URL(trimmed, appUrl);
    const base = new URL(appUrl);
    if (resolved.origin !== base.origin) return fallback;
    return resolved.pathname + resolved.search + resolved.hash;
  } catch {
    return fallback;
  }
}

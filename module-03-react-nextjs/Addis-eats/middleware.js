/**
 * middleware.js — Next.js edge middleware (Layer 1 of 3 security layers).
 *
 * Protects /checkout and /orders from unauthenticated visitors.
 * This is only the first gate — every protected page, action, and API route
 * still performs its own server-side session check.
 */
import { NextResponse } from 'next/server';
import { COOKIE_NAME } from './lib/constants';

export function middleware(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const { pathname, searchParams } = request.nextUrl;

  if (!token) {
    // Preserve the intended destination as a safely-encoded query param.
    const next = encodeURIComponent(pathname + (searchParams.toString() ? `?${searchParams}` : ''));
    const signinUrl = new URL(`/signin?next=${next}`, request.url);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*', '/orders/:path*'],
};

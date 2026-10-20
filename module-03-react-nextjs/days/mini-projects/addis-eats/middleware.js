import { NextResponse } from "next/server";
import { decodeSession, COOKIE_NAME } from "@/lib/session";

// Ex 3: matcher covers only /checkout and /orders (and their sub-paths)
export const config = {
  matcher: ["/checkout", "/checkout/:path*", "/orders", "/orders/:path*", "/kitchen", "/kitchen/:path*"],
};

export async function middleware(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = await decodeSession(token);

  const { pathname } = request.nextUrl;

  // Not logged in — redirect to login with ?next= for return (Ex 4)
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Ex 7: /kitchen is staff-only — check role server-side, not in markup
  if (pathname.startsWith("/kitchen") && session.role !== "staff") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

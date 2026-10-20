"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { encodeSession, COOKIE_NAME } from "@/lib/session";

// In-memory user store — replace with a real DB
const USERS = [
  { id: "u1", email: "user@addis-eats.com", password: "password123", role: "user" },
  { id: "u2", email: "staff@addis-eats.com", password: "staffpass", role: "staff" },
];

export async function signIn(prevState, formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  // Carry the intended destination for redirect-after-login (Ex 4)
  const next = formData.get("next")?.toString() ?? "/";

  const user = USERS.find((u) => u.email === email && u.password === password);

  if (!user) {
    return { error: "Invalid email or password." };
  }

  const token = await encodeSession({ id: user.id, email: user.email, role: user.role });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,                          // not readable from JS
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,               // 7 days
    path: "/",
  });

  // Ex 5: reject any next value that does not start with a slash
  const destination = next.startsWith("/") ? next : "/";
  redirect(destination);
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/login");
}

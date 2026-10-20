import { cookies } from "next/headers";

const SECRET = process.env.SESSION_SECRET ?? "dev-secret-change-me";
const COOKIE_NAME = "session";

// --- tiny HMAC sign/verify (no external deps) ---

async function hmacSign(payload) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return Buffer.from(sig).toString("base64url");
}

async function hmacVerify(payload, sig) {
  const expected = await hmacSign(payload);
  return expected === sig;
}

// Encode session data as base64url.payload.signature
export async function encodeSession(data) {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
  const sig = await hmacSign(payload);
  return `${payload}.${sig}`;
}

// Decode and verify — returns null if invalid or expired
export async function decodeSession(token) {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const valid = await hmacVerify(payload, sig);
  if (!valid) return null;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString());
  } catch {
    return null;
  }
}

// Read and verify the session cookie from the current request
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return decodeSession(token);
}

export { COOKIE_NAME };

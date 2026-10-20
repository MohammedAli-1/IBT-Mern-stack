import { NextResponse } from 'next/server';
import { verifyCredentials } from '../../../../lib/users';
import { createSession } from '../../../../lib/session';
import { safeRedirect } from '../../../../lib/safe-redirect';
import { z } from 'zod';

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  next: z.string().optional(),
});

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = SignInSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email or password format.' }, { status: 400 });
  }

  const { email, password, next } = parsed.data;
  const user = verifyCredentials(email, password);

  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  try {
    await createSession(user);
  } catch (err) {
    console.error('createSession failed:', err.message);
    return NextResponse.json(
      { error: 'Server configuration error. AUTH_SECRET may not be set.' },
      { status: 500 }
    );
  }

  const destination = safeRedirect(next);
  return NextResponse.json({ ok: true, redirect: destination, role: user.role });
}

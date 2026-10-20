'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, next }),
      });
      let data = {};
      try { data = await res.json(); } catch { /* non-JSON response */ }
      if (!res.ok) {
        setError(data.error || 'Sign-in failed. Please check the server logs.');
        return;
      }
      // Redirect to the server-validated destination
      router.push(data.redirect || '/orders');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🍽️</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>Sign in to Addis Eats</h1>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '0.4rem', fontSize: '0.9rem' }}>
            Welcome back! Please enter your credentials.
          </p>
        </div>

        {error && <div className="alert alert-error" role="alert">{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0.75rem', fontSize: '1rem', marginTop: '0.5rem' }}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--color-primary-light)', borderRadius: 'var(--radius)', fontSize: '0.82rem' }}>
          <strong>Demo accounts</strong> (password: <code>password</code>)
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
            <li>abebe@addiseats.test — customer</li>
            <li>tigist@addiseats.test — customer</li>
            <li>dawit@addiseats.test — staff</li>
            <li>sara@addiseats.test — staff</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}

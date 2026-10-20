import Link from 'next/link';

export const metadata = {
  title: '404 — Page Not Found',
};

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '5rem 0' }}>
      <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🍽️</div>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
        404 — Page Not Found
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
        That page doesn&apos;t exist. Maybe try browsing the menu?
      </p>
      <Link href="/" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
        Go Home
      </Link>
    </div>
  );
}

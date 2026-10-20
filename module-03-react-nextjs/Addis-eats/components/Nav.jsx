'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartProvider';
import { useEffect, useState } from 'react';

export default function Nav() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [session, setSession] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setSession(data?.user ?? null))
      .catch(() => setSession(null));
  }, [pathname]);

  const active = (href) =>
    pathname === href ? { color: 'var(--color-primary)', fontWeight: 700 } : {};

  return (
    <header style={{ background: '#fff', borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, zIndex: 100 }}>
      <nav className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        {/* Logo */}
        <Link href="/" style={{ fontWeight: 900, fontSize: '1.35rem', color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>
          🍽️ Addis Eats
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="nav-links">
          <Link href="/menu" style={active('/menu')}>Menu</Link>
          {session && <Link href="/favorites" style={active('/favorites')}>Favourites</Link>}
          {session && <Link href="/orders" style={active('/orders')}>Orders</Link>}
          {session?.role === 'staff' && (
            <>
              <Link href="/kitchen" style={active('/kitchen')}>Kitchen</Link>
              <Link href="/dashboard" style={active('/dashboard')}>Dashboard</Link>
            </>
          )}
          <Link href="/cart" style={{ position: 'relative', ...active('/cart') }}>
            🛒 Cart
            {itemCount > 0 && (
              <span style={{
                position: 'absolute', top: '-8px', right: '-10px',
                background: 'var(--color-primary)', color: '#fff',
                borderRadius: '99px', fontSize: '0.7rem', fontWeight: 700,
                padding: '1px 5px', minWidth: '18px', textAlign: 'center',
              }}>
                {itemCount}
              </span>
            )}
          </Link>
          {session ? (
            <form action="/api/auth/signout" method="POST">
              <button type="submit" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                Sign out
              </button>
            </form>
          ) : (
            <Link href="/signin" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.5rem' }}
          className="hamburger"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid var(--color-border)', padding: '1rem' }} className="mobile-menu">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href="/menu" onClick={() => setMenuOpen(false)}>Menu</Link>
            {session && <Link href="/favorites" onClick={() => setMenuOpen(false)}>Favourites</Link>}
            {session && <Link href="/orders" onClick={() => setMenuOpen(false)}>Orders</Link>}
            {session?.role === 'staff' && (
              <>
                <Link href="/kitchen" onClick={() => setMenuOpen(false)}>Kitchen</Link>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              </>
            )}
            <Link href="/cart" onClick={() => setMenuOpen(false)}>Cart {itemCount > 0 && `(${itemCount})`}</Link>
            {session ? (
              <form action="/api/auth/signout" method="POST">
                <button type="submit" className="btn btn-outline" style={{ width: '100%' }}>Sign out</button>
              </form>
            ) : (
              <Link href="/signin" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Sign in</Link>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </header>
  );
}

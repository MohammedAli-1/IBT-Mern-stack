import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: '#1a1a1a',
      color: '#ccc',
      padding: '2.5rem 0 1.5rem',
      marginTop: 'auto',
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>🍽️ Addis Eats</div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>
            Authentic Ethiopian cuisine, delivered fresh to your door across Addis Ababa.
          </p>
        </div>
        <div>
          <h3 style={{ color: '#fff', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Explore</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem' }}>
            <li><Link href="/menu" style={{ color: '#ccc' }}>Menu</Link></li>
            <li><Link href="/cart" style={{ color: '#ccc' }}>Cart</Link></li>
            <li><Link href="/orders" style={{ color: '#ccc' }}>My Orders</Link></li>
            <li><Link href="/favorites" style={{ color: '#ccc' }}>Favourites</Link></li>
          </ul>
        </div>
        <div>
          <h3 style={{ color: '#fff', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Neighbourhoods</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem' }}>
            <li style={{ color: '#ccc' }}>Bole</li>
            <li style={{ color: '#ccc' }}>Kazanchis</li>
            <li style={{ color: '#ccc' }}>Megenagna</li>
          </ul>
        </div>
      </div>
      <div className="container" style={{ borderTop: '1px solid #333', marginTop: '1.5rem', paddingTop: '1rem', fontSize: '0.8rem', color: '#888', textAlign: 'center' }}>
        © {new Date().getFullYear()} Addis Eats. All rights reserved.
      </div>
    </footer>
  );
}

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../components/CartProvider';

export default function CheckoutClient({ user }) {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1>Your cart is empty</h1>
        <p style={{ marginTop: '1rem' }}><a href="/menu" className="btn btn-primary">Browse Menu</a></p>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ dishId: i.dishId, quantity: i.quantity })),
          deliveryAddress: address,
          phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to place order.');
        return;
      }
      clearCart();
      router.push(`/orders/${data.order.id}?confirmed=1`);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ padding: '2rem 0 4rem' }}>
      <div className="page-header">
        <h1>Checkout</h1>
        <p>Placing order as {user.name}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>
        {/* Form */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.1rem' }}>Delivery Details</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            We deliver to Bole, Kazanchis, and Megenagna.{' '}
            <a href="/#delivery-areas" style={{ color: 'var(--color-primary)' }}>View delivery map →</a>
          </p>
          {error && <div className="alert alert-error" role="alert">{error}</div>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <input
                id="address"
                type="text"
                required
                minLength={5}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Bole Road, House 42, Addis Ababa"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+251 91 000 0000"
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}>
              {loading ? 'Placing order…' : `Place Order — ETB ${total}`}
            </button>
          </form>
        </div>

        {/* Summary */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.1rem' }}>Your Order</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {items.map((item) => (
              <div key={item.dishId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span>{item.name} × {item.quantity}</span>
                <span>ETB {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
            <span>Total</span>
            <span>ETB {total}</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.75rem' }}>
            Final total is calculated server-side from current prices.
          </p>
        </div>
      </div>
    </div>
  );
}

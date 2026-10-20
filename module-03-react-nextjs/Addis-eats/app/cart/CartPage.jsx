'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../components/CartProvider';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>Your cart is empty</h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Add some dishes from our menu to get started.</p>
        <Link href="/menu" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Browse Menu</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0 4rem' }}>
      <div className="page-header">
        <h1>Your Cart</h1>
        <p>{items.length} item{items.length !== 1 ? 's' : ''}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>
        {/* Items list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item) => (
            <div key={item.dishId} className="card" style={{ display: 'flex', gap: '1rem', padding: '1rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '90px', height: '70px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                <Image src={item.image} alt={item.name} fill sizes="90px" style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{item.name}</div>
                <div style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}>ETB {item.price} each</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button onClick={() => updateQuantity(item.dishId, item.quantity - 1)} className="btn btn-outline" style={{ padding: '0.3rem 0.7rem', fontSize: '1rem' }} aria-label="Decrease">−</button>
                <span style={{ fontWeight: 700, minWidth: '24px', textAlign: 'center' }} aria-live="polite">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.dishId, item.quantity + 1)} className="btn btn-outline" style={{ padding: '0.3rem 0.7rem', fontSize: '1rem' }} aria-label="Increase">+</button>
              </div>
              <div style={{ fontWeight: 700, minWidth: '80px', textAlign: 'right' }}>ETB {item.price * item.quantity}</div>
              <button onClick={() => removeItem(item.dishId)} style={{ background: 'none', border: 'none', color: 'var(--color-error)', fontSize: '1.1rem', cursor: 'pointer', padding: '0.25rem' }} aria-label={`Remove ${item.name}`}>✕</button>
            </div>
          ))}
          <button onClick={clearCart} className="btn btn-outline" style={{ alignSelf: 'flex-start', color: 'var(--color-error)', borderColor: 'var(--color-error)' }}>
            Clear cart
          </button>
        </div>

        {/* Order summary */}
        <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '80px' }}>
          <h2 style={{ fontWeight: 800, marginBottom: '1.25rem', fontSize: '1.15rem' }}>Order Summary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
            {items.map((item) => (
              <div key={item.dishId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span>{item.name} × {item.quantity}</span>
                <span>ETB {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.05rem' }}>
            <span>Total</span>
            <span>ETB {total}</span>
          </div>
          <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', marginTop: '1.25rem', padding: '0.75rem', textAlign: 'center' }}>
            Proceed to Checkout →
          </Link>
          <Link href="/menu" style={{ display: 'block', textAlign: 'center', marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            ← Continue shopping
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

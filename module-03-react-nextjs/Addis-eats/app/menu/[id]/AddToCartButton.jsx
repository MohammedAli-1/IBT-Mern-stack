'use client';
import { useState } from 'react';
import { useCart } from '../../../components/CartProvider';

export default function AddToCartButton({ dish }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(dish, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          style={{ padding: '0.5rem 0.9rem', background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}
          aria-label="Decrease quantity"
        >−</button>
        <span style={{ padding: '0.5rem 0.75rem', fontWeight: 700, minWidth: '2rem', textAlign: 'center' }} aria-live="polite">{qty}</span>
        <button
          onClick={() => setQty((q) => Math.min(20, q + 1))}
          style={{ padding: '0.5rem 0.9rem', background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}
          aria-label="Increase quantity"
        >+</button>
      </div>
      <button
        onClick={handleAdd}
        className="btn btn-primary"
        style={{ flex: 1, padding: '0.65rem 1rem' }}
        aria-label={`Add ${qty} ${dish.name} to cart`}
      >
        {added ? '✓ Added!' : 'Add to Cart'}
      </button>
    </div>
  );
}

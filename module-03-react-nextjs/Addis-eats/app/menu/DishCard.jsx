'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../components/CartProvider';

export default function DishCard({ dish }) {
  const { addItem } = useCart();

  return (
    <article className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <Link href={`/menu/${dish.id}`} style={{ display: 'block', position: 'relative', height: '190px', overflow: 'hidden' }}>
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
          loading="lazy"
        />
        <span style={{
          position: 'absolute', top: '0.6rem', right: '0.6rem',
          background: 'var(--color-primary)', color: '#fff',
          borderRadius: 'var(--radius)', padding: '0.2rem 0.6rem',
          fontSize: '0.75rem', fontWeight: 700,
        }}>
          {dish.category}
        </span>
      </Link>
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.4rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>
          <Link href={`/menu/${dish.id}`}>{dish.name}</Link>
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', flex: 1, lineHeight: 1.5 }}>
          {dish.description.slice(0, 80)}{dish.description.length > 80 ? '…' : ''}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
          <span style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.05rem' }}>ETB {dish.price}</span>
          <button
            onClick={() => addItem(dish)}
            className="btn btn-primary"
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
            aria-label={`Add ${dish.name} to cart`}
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}

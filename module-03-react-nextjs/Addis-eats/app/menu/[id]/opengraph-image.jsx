import { ImageResponse } from 'next/og';
import { getDishById } from '../../../lib/dishes';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    return new ImageResponse(
      (
        <div style={{ width: 1200, height: 630, background: '#c8390c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 64, fontWeight: 900 }}>Addis Eats</span>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          background: '#1a1a1a',
          position: 'relative',
        }}
      >
        {/* Left: dish info */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '64px',
            background: 'linear-gradient(135deg, #c8390c 0%, #a02d09 100%)',
          }}
        >
          <div style={{ color: '#ffcfb8', fontSize: 22, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {dish.category}
          </div>
          <div style={{ color: '#ffffff', fontSize: 56, fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
            {dish.name}
          </div>
          <div style={{ color: '#ffe8e0', fontSize: 24, lineHeight: 1.5, marginBottom: 32, maxWidth: 440 }}>
            {dish.description.slice(0, 100)}{dish.description.length > 100 ? '…' : ''}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ background: '#fff', color: '#c8390c', borderRadius: 12, padding: '10px 28px', fontSize: 32, fontWeight: 900 }}>
              ETB {dish.price}
            </div>
          </div>
          <div style={{ marginTop: 40, color: '#ffcfb8', fontSize: 20, fontWeight: 700 }}>
            🍽️ Addis Eats
          </div>
        </div>

        {/* Right: image */}
        <div style={{ width: 500, position: 'relative', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dish.image}
            alt={dish.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, #a02d09 0%, transparent 40%)',
          }} />
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #c8390c 0%, #a02d09 55%, #1a1a1a 100%)',
        }}
      >
        <div style={{ fontSize: 100, marginBottom: 24 }}>🍽️</div>
        <div style={{ color: '#fff', fontSize: 80, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 16 }}>
          Addis Eats
        </div>
        <div style={{ color: '#ffcfb8', fontSize: 32, fontWeight: 400, maxWidth: 700, textAlign: 'center', lineHeight: 1.4 }}>
          Authentic Ethiopian Food Delivery across Addis Ababa
        </div>
        <div style={{
          marginTop: 48,
          display: 'flex',
          gap: 24,
          color: '#ffe8e0',
          fontSize: 24,
        }}>
          <span>Doro Wat</span>
          <span>·</span>
          <span>Tibs</span>
          <span>·</span>
          <span>Shiro</span>
          <span>·</span>
          <span>Kitfo</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

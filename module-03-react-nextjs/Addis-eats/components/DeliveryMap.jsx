'use client';
import { useEffect, useRef, useState } from 'react';

const NEIGHBOURHOODS = [
  {
    id: 'bole',
    name: 'Bole',
    description: 'Airport area, embassies, upscale restaurants',
    deliveryTime: '20–35 min',
    color: '#c8390c',
    // Bole sub-city: south-east Addis, near Bole International Airport
    lat: 8.9980,
    lng: 38.7897,
    dishes: ['Doro Wat', 'Kitfo', 'Injera Firfir', 'Sambusa'],
    polygon: [
      [9.0120, 38.7700],
      [9.0180, 38.8000],
      [9.0000, 38.8150],
      [8.9820, 38.8050],
      [8.9780, 38.7780],
      [8.9900, 38.7600],
    ],
  },
  {
    id: 'kazanchis',
    name: 'Kazanchis',
    description: 'Central business district, commercial hub',
    deliveryTime: '15–25 min',
    color: '#1565c0',
    // Kazanchis: central Addis around Mexico Square area
    lat: 9.0092,
    lng: 38.7614,
    dishes: ['Tibs', 'Misir Wot', 'Tej', 'Fatira'],
    polygon: [
      [9.0200, 38.7500],
      [9.0250, 38.7700],
      [9.0100, 38.7780],
      [8.9980, 38.7700],
      [8.9960, 38.7520],
      [9.0080, 38.7440],
    ],
  },
  {
    id: 'megenagna',
    name: 'Megenagna',
    description: 'Northern residential and commercial hub',
    deliveryTime: '25–40 min',
    color: '#2e7d32',
    // Megenagna: north Addis near the roundabout on the ring road
    lat: 9.0384,
    lng: 38.7612,
    dishes: ['Shiro', 'Gored Gored', 'Ayib be Gomen', 'Kategna'],
    polygon: [
      [9.0500, 38.7480],
      [9.0550, 38.7720],
      [9.0380, 38.7800],
      [9.0220, 38.7700],
      [9.0220, 38.7500],
      [9.0360, 38.7420],
    ],
  },
];

export default function DeliveryMap() {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);
  const [active, setActive] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Dynamically import Leaflet only on the client
    let L;
    let mounted = true;

    async function initMap() {
      L = await import('leaflet');
      // Leaflet CSS — inject once
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (!mounted || !mapRef.current || instanceRef.current) return;

      // Fix Leaflet's default icon paths broken by webpack
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // Centre between all three neighbourhoods, zoom to fit
      const map = L.map(mapRef.current, {
        center: [9.0180, 38.7750],
        zoom: 13,
        scrollWheelZoom: false,
      });
      instanceRef.current = map;

      // OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      const allPolygons = [];

      // Draw each neighbourhood
      NEIGHBOURHOODS.forEach((n) => {
        // Polygon shading
        const poly = L.polygon(n.polygon, {
          color: n.color,
          fillColor: n.color,
          fillOpacity: 0.25,
          weight: 2,
        }).addTo(map);

        allPolygons.push(poly);

        // Custom coloured marker
        const icon = L.divIcon({
          className: '',
          html: `<div style="
            background:${n.color};color:#fff;padding:4px 10px;
            border-radius:99px;font-size:12px;font-weight:700;
            white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.25);
            border:2px solid #fff;
          ">${n.name}</div>`,
          iconAnchor: [40, 16],
        });

        const marker = L.marker([n.lat, n.lng], { icon }).addTo(map);

        // Popup content
        const popupHtml = `
          <div style="min-width:180px;font-family:inherit">
            <div style="font-weight:800;font-size:14px;color:${n.color};margin-bottom:4px">${n.name}</div>
            <div style="font-size:12px;color:#555;margin-bottom:6px">${n.description}</div>
            <div style="font-size:12px;margin-bottom:6px">🕐 <strong>${n.deliveryTime}</strong></div>
            <div style="font-size:11px;color:#888">Popular: ${n.dishes.join(', ')}</div>
          </div>`;

        marker.bindPopup(popupHtml);
        poly.bindPopup(popupHtml);

        poly.on('click', () => { setActive(n.id); poly.openPopup(); });
        marker.on('click', () => setActive(n.id));
      });

      // Auto-fit map to show all three neighbourhoods
      if (allPolygons.length > 0) {
        const group = L.featureGroup(allPolygons);
        map.fitBounds(group.getBounds().pad(0.15));
      }

      if (mounted) setReady(true);
    }

    initMap();
    return () => {
      mounted = false;
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
    };
  }, []);

  const activeN = NEIGHBOURHOODS.find((n) => n.id === active);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }}>
      {/* Map container */}
      <div style={{ position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
        {!ready && (
          <div style={{
            position: 'absolute', inset: 0, background: '#f0ebe6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10, borderRadius: 'var(--radius)',
          }}>
            <div className="spinner" />
          </div>
        )}
        <div
          ref={mapRef}
          style={{ height: '420px', width: '100%' }}
          aria-label="Addis Ababa delivery areas map"
          role="application"
        />
      </div>

      {/* Side panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
          Click a neighbourhood on the map or select below:
        </p>
        {NEIGHBOURHOODS.map((n) => (
          <button
            key={n.id}
            onClick={() => {
              setActive(n.id);
              if (instanceRef.current) {
                instanceRef.current.setView([n.lat, n.lng], 13, { animate: true });
              }
            }}
            style={{
              display: 'flex', flexDirection: 'column', gap: '0.25rem',
              background: active === n.id ? n.color + '12' : '#fff',
              border: `2px solid ${active === n.id ? n.color : 'var(--color-border)'}`,
              borderRadius: 'var(--radius)', padding: '0.75rem 1rem',
              cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: active === n.id ? n.color : 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: n.color, display: 'inline-block' }} />
                {n.name}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{n.deliveryTime}</span>
            </div>
            {active === n.id && (
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                {n.description}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.4rem' }}>
                  {n.dishes.map((d) => (
                    <span key={d} style={{ background: n.color + '18', color: n.color, borderRadius: '99px', padding: '0.1rem 0.5rem', fontSize: '0.75rem', fontWeight: 600 }}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </button>
        ))}

        <a href="/menu" className="btn btn-primary" style={{ textAlign: 'center', marginTop: '0.5rem', padding: '0.65rem' }}>
          {activeN ? `Order from ${activeN.name} →` : 'Browse Menu →'}
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .delivery-map-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

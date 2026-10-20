'use client';
import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());
const STATUSES = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];
const ACTIVE_STATUSES = ['pending', 'confirmed', 'preparing', 'ready'];

export default function KitchenClient({ initialOrders }) {
  const [updating, setUpdating] = useState({});
  const [errors, setErrors] = useState({});

  // Poll kitchen API every 10 seconds
  const { data, mutate } = useSWR('/api/kitchen/orders', fetcher, {
    fallbackData: { orders: initialOrders },
    refreshInterval: 10000,
  });

  const orders = (data?.orders || initialOrders).filter((o) =>
    ACTIVE_STATUSES.includes(o.status)
  );

  async function updateStatus(orderId, status) {
    setUpdating((p) => ({ ...p, [orderId]: true }));
    setErrors((p) => ({ ...p, [orderId]: '' }));
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const d = await res.json();
      if (!res.ok) {
        setErrors((p) => ({ ...p, [orderId]: d.error || 'Update failed.' }));
        return;
      }
      mutate();
    } catch {
      setErrors((p) => ({ ...p, [orderId]: 'Network error.' }));
    } finally {
      setUpdating((p) => ({ ...p, [orderId]: false }));
    }
  }

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
        <p style={{ fontSize: '1.2rem' }}>No active orders right now.</p>
        <p>All caught up! 🎉</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
      {orders.map((order) => (
        <div key={order.id} className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem' }}>Order #{order.id}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{new Date(order.createdAt).toLocaleTimeString('en-GB')}</div>
            </div>
            <span className={`badge badge-${order.status}`}>{order.status}</span>
          </div>

          <ul style={{ listStyle: 'none', marginBottom: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {order.items.map((item) => (
              <li key={item.dishId} style={{ fontSize: '0.88rem' }}>
                {item.quantity}× {item.name}
              </li>
            ))}
          </ul>

          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
            📍 {order.deliveryAddress}
          </div>

          {errors[order.id] && (
            <div className="alert alert-error" style={{ padding: '0.5rem 0.75rem', marginBottom: '0.5rem' }}>{errors[order.id]}</div>
          )}

          {/* Status update buttons */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {STATUSES.filter((s) => s !== order.status).map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(order.id, s)}
                disabled={!!updating[order.id]}
                className="btn btn-outline"
                style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem', textTransform: 'capitalize' }}
              >
                → {s}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

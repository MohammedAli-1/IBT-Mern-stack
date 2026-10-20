'use client';
import useSWR from 'swr';
import Link from 'next/link';
import { useState } from 'react';

const fetcher = (url) => fetch(url).then((r) => {
  if (!r.ok) throw new Error('Failed to fetch order.');
  return r.json();
});

const TERMINAL_STATUSES = ['delivered', 'cancelled'];

export default function OrderDetail({ initialOrder, confirmed, orderId }) {
  const isTerminal = TERMINAL_STATUSES.includes(initialOrder?.status);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState('');

  // Poll every 5 seconds unless the order is in a terminal state
  const { data, error, mutate } = useSWR(
    `/api/orders/${orderId}`,
    fetcher,
    {
      fallbackData: { order: initialOrder },
      refreshInterval: isTerminal ? 0 : 5000,
      revalidateOnFocus: !isTerminal,
    }
  );

  const order = data?.order || initialOrder;

  async function handleCancel() {
    if (!confirm('Cancel this order?')) return;
    setCancelling(true);
    setCancelError('');
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      });
      if (!res.ok) {
        const d = await res.json();
        setCancelError(d.error || 'Failed to cancel order.');
        return;
      }
      mutate();
    } catch {
      setCancelError('Network error.');
    } finally {
      setCancelling(false);
    }
  }

  const statusSteps = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];
  const currentIdx = statusSteps.indexOf(order.status);

  return (
    <div className="container" style={{ padding: '2rem 0 4rem', maxWidth: '700px' }}>
      {confirmed && (
        <div className="alert alert-success" role="status">
          🎉 Your order has been placed successfully!
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>Order #{order.id}</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>
            Placed {new Date(order.createdAt).toLocaleString('en-GB')}
          </p>
        </div>
        <span className={`badge badge-${order.status}`} style={{ fontSize: '0.9rem', padding: '0.3rem 1rem' }}>
          {order.status}
        </span>
      </div>

      {error && <div className="alert alert-error">Could not refresh order status.</div>}

      {/* Progress bar */}
      {order.status !== 'cancelled' && (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '1rem' }}>Order Progress</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }} role="list" aria-label="Order status steps">
            {statusSteps.map((step, idx) => {
              const done = idx <= currentIdx;
              return (
                <div key={step} style={{ display: 'flex', alignItems: 'center', flex: idx < statusSteps.length - 1 ? 1 : 'unset' }} role="listitem">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: done ? 'var(--color-primary)' : 'var(--color-border)',
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', fontWeight: 700, flexShrink: 0,
                    }}>
                      {done ? '✓' : idx + 1}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: done ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: done ? 600 : 400, textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
                      {step}
                    </span>
                  </div>
                  {idx < statusSteps.length - 1 && (
                    <div style={{ flex: 1, height: '3px', background: idx < currentIdx ? 'var(--color-primary)' : 'var(--color-border)', margin: '0 4px', marginBottom: '1.4rem' }} />
                  )}
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.75rem' }}>
            Status refreshes automatically every 5 seconds.
          </p>
        </div>
      )}

      {/* Items */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>Items</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {order.items.map((item) => (
            <div key={item.dishId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span>{item.name} × {item.quantity}</span>
              <span style={{ fontWeight: 600 }}>ETB {item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
          <span>Total</span>
          <span>ETB {order.total}</span>
        </div>
      </div>

      {/* Delivery */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1rem' }}>Delivery Details</h2>
        <p style={{ fontSize: '0.9rem' }}><strong>Address:</strong> {order.deliveryAddress}</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.4rem' }}><strong>Phone:</strong> {order.phone}</p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Link href="/orders" className="btn btn-outline">← Back to Orders</Link>
        {order.status === 'pending' && (
          <button onClick={handleCancel} className="btn btn-danger" disabled={cancelling}>
            {cancelling ? 'Cancelling…' : 'Cancel Order'}
          </button>
        )}
      </div>
      {cancelError && <div className="alert alert-error" style={{ marginTop: '0.75rem' }}>{cancelError}</div>}
    </div>
  );
}

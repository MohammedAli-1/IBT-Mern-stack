'use client';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const SORT_FIELDS = { createdAt: 'Date', total: 'Total', status: 'Status' };

export default function OrderTable({ orders, total, page, totalPages, sort, dir }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function buildUrl(overrides) {
    const params = new URLSearchParams(searchParams);
    Object.entries(overrides).forEach(([k, v]) => params.set(k, v));
    return `${pathname}?${params}`;
  }

  function handleSort(field) {
    const newDir = sort === field && dir === 'desc' ? 'asc' : 'desc';
    router.push(buildUrl({ sort: field, dir: newDir, page: 1 }));
  }

  if (orders.length === 0 && page === 1) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
        <p style={{ fontSize: '1.2rem' }}>No orders yet.</p>
        <Link href="/menu" className="btn btn-primary" style={{ marginTop: '1rem' }}>Start ordering</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="table-wrapper">
        <table aria-label="Your orders">
          <thead>
            <tr>
              <th>Order ID</th>
              {Object.entries(SORT_FIELDS).map(([field, label]) => (
                <th key={field}>
                  <button
                    onClick={() => handleSort(field)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem' }}
                    aria-label={`Sort by ${label}`}
                  >
                    {label}
                    {sort === field && <span aria-hidden="true">{dir === 'desc' ? ' ↓' : ' ↑'}</span>}
                  </button>
                </th>
              ))}
              <th>Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link href={`/orders/${order.id}`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                    #{order.id}
                  </Link>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString('en-GB')}</td>
                <td>ETB {order.total}</td>
                <td><span className={`badge badge-${order.status}`}>{order.status}</span></td>
                <td>{order.items.reduce((s, i) => s + i.quantity, 0)} item(s)</td>
                <td>
                  <Link href={`/orders/${order.id}`} className="btn btn-outline" style={{ padding: '0.3rem 0.8rem', fontSize: '0.82rem' }}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Orders pagination" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <Link href={buildUrl({ page: Math.max(1, page - 1) })} className={`btn btn-outline${page <= 1 ? ' btn-disabled' : ''}`} style={{ padding: '0.4rem 1rem' }} aria-disabled={page <= 1}>← Prev</Link>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={buildUrl({ page: p })}
              className="btn"
              style={{ padding: '0.4rem 0.8rem', background: p === page ? 'var(--color-primary)' : 'transparent', color: p === page ? '#fff' : 'inherit', border: '1.5px solid var(--color-border)' }}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </Link>
          ))}
          <Link href={buildUrl({ page: Math.min(totalPages, page + 1) })} className={`btn btn-outline${page >= totalPages ? ' btn-disabled' : ''}`} style={{ padding: '0.4rem 1rem' }} aria-disabled={page >= totalPages}>Next →</Link>
        </nav>
      )}

      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', textAlign: 'right', marginTop: '0.75rem' }}>
        Showing {orders.length} of {total} order{total !== 1 ? 's' : ''}
      </p>
    </div>
  );
}

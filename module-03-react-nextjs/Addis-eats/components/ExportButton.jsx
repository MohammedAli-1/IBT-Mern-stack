'use client';
import { useState } from 'react';

/**
 * A button that triggers a CSV download from the given API endpoint.
 */
export default function ExportButton({ href, label = 'Export CSV', style = {} }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleClick() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(href);
      if (!res.ok) {
        setError('Export failed. Please try again.');
        return;
      }
      // Extract filename from Content-Disposition header if present
      const disposition = res.headers.get('Content-Disposition') || '';
      const match = disposition.match(/filename="([^"]+)"/);
      const filename = match ? match[1] : 'export.csv';

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError('Network error during export.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '0.25rem', ...style }}>
      <button
        onClick={handleClick}
        disabled={loading}
        className="btn btn-outline"
        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', fontSize: '0.875rem' }}
        aria-label={label}
      >
        {loading ? (
          <span className="spinner" style={{ width: '0.9rem', height: '0.9rem', borderWidth: '2px' }} />
        ) : (
          <span aria-hidden="true">⬇</span>
        )}
        {loading ? 'Exporting…' : label}
      </button>
      {error && <span style={{ fontSize: '0.78rem', color: 'var(--color-error)' }}>{error}</span>}
    </div>
  );
}

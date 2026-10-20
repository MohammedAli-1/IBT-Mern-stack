export default function OrdersLoading() {
  return (
    <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
      <div className="spinner" />
      <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>Loading your orders…</p>
    </div>
  );
}

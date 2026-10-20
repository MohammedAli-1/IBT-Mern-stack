'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import useSWR from 'swr';
import DishCard from './DishCard';

const fetcher = (url) => fetch(url).then((r) => r.json());

function buildUrl(search, category, page) {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (category) params.set('category', category);
  params.set('page', String(page));
  return `/api/dishes?${params}`;
}

export default function MenuClient({ initialDishes, categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const debounceTimer = useRef(null);

  // Debounce search input ~300ms
  useEffect(() => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(debounceTimer.current);
  }, [search]);

  // Sync URL with state
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (category) params.set('category', category);
    if (page > 1) params.set('page', String(page));
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  }, [debouncedSearch, category, page, pathname, router]);

  const swrKey = buildUrl(debouncedSearch, category, page);
  const fallbackData = { items: initialDishes, total: initialDishes.length, page: 1, totalPages: Math.ceil(initialDishes.length / 8), pageSize: 8 };

  const { data, isLoading, error } = useSWR(swrKey, fetcher, {
    fallbackData,
    keepPreviousData: true,
  });

  const dishes = data?.items || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="container" style={{ padding: '2rem 0 4rem' }}>
      <div className="page-header">
        <h1>Our Menu</h1>
        <p>Authentic Ethiopian dishes made fresh daily.</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label htmlFor="search" style={{ display: 'block', fontWeight: 600, marginBottom: '0.35rem', fontSize: '0.9rem' }}>Search</label>
          <input
            id="search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes…"
            style={{ width: '100%', padding: '0.65rem 0.9rem', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius)', fontSize: '0.95rem', fontFamily: 'inherit' }}
            aria-label="Search menu dishes"
          />
        </div>
        <div>
          <label htmlFor="category" style={{ display: 'block', fontWeight: 600, marginBottom: '0.35rem', fontSize: '0.9rem' }}>Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            style={{ padding: '0.65rem 0.9rem', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius)', fontSize: '0.95rem', fontFamily: 'inherit', background: '#fff' }}
          >
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* State displays */}
      {isLoading && !data && (
        <div style={{ textAlign: 'center', padding: '3rem' }}><div className="spinner" /></div>
      )}
      {error && (
        <div className="alert alert-error" role="alert">Failed to load dishes. Please try again.</div>
      )}
      {!isLoading && dishes.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
          <p style={{ fontSize: '1.2rem' }}>No dishes found.</p>
          <p>Try a different search or category.</p>
        </div>
      )}

      {dishes.length > 0 && (
        <div className="grid-cards" style={{ opacity: isLoading ? 0.6 : 1, transition: 'opacity 0.2s' }}>
          {dishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Menu pagination" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="btn btn-outline"
            style={{ padding: '0.5rem 1rem' }}
            aria-label="Previous page"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="btn"
              style={{
                padding: '0.5rem 1rem',
                background: p === page ? 'var(--color-primary)' : 'transparent',
                color: p === page ? '#fff' : 'var(--color-text)',
                border: '1.5px solid var(--color-border)',
              }}
              aria-current={p === page ? 'page' : undefined}
              aria-label={`Page ${p}`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="btn btn-outline"
            style={{ padding: '0.5rem 1rem' }}
            aria-label="Next page"
          >
            Next →
          </button>
        </nav>
      )}
    </div>
  );
}

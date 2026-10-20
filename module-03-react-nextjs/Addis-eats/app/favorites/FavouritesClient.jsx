'use client';
import { useState, useEffect } from 'react';
import DishCard from '../menu/DishCard';

export default function FavouritesClient() {
  const [favourites, setFavourites] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('addiseats_favourites') || '[]');
      setFavourites(saved);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    if (favourites.length === 0) { setDishes([]); return; }
    fetch('/api/dishes?pageSize=50')
      .then((r) => r.json())
      .then((data) => {
        setDishes((data.items || []).filter((d) => favourites.includes(d.id)));
      })
      .catch(() => setDishes([]));
  }, [favourites]);

  if (loading) return (
    <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
      <div className="spinner" />
    </div>
  );

  return (
    <div className="container" style={{ padding: '2rem 0 4rem' }}>
      <div className="page-header">
        <h1>Favourites</h1>
        <p>Dishes you&apos;ve saved for quick ordering.</p>
      </div>

      {dishes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
          <p style={{ fontSize: '1.2rem' }}>No favourites yet.</p>
          <p>Tap the ♡ icon on any dish to save it here.</p>
          <a href="/menu" className="btn btn-primary" style={{ marginTop: '1.25rem', display: 'inline-block' }}>Browse Menu</a>
        </div>
      ) : (
        <div className="grid-cards">
          {dishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}
        </div>
      )}
    </div>
  );
}

import { Suspense } from 'react';
import MenuClient from './MenuClient';
import { getAllDishes, getCategories } from '../../lib/dishes';

export const metadata = {
  title: 'Menu',
  description: 'Browse our full menu of authentic Ethiopian dishes — Doro Wat, Tibs, Shiro, and much more.',
};

export default function MenuPage() {
  const allDishes = getAllDishes();
  const categories = getCategories();
  return (
    <Suspense fallback={<div className="container" style={{ padding: '3rem 0' }}><div className="spinner" /></div>}>
      <MenuClient initialDishes={allDishes} categories={categories} />
    </Suspense>
  );
}

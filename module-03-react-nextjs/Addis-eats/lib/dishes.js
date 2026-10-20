/**
 * lib/dishes.js
 * Dish data access helpers.
 * Safe to use on server and client (no secrets).
 */
import dishesData from '../data/dishes.json';

export function getAllDishes() {
  return dishesData.filter((d) => d.available);
}

export function getDishById(id) {
  return dishesData.find((d) => d.id === String(id)) ?? null;
}

export function getCategories() {
  return [...new Set(dishesData.map((d) => d.category))];
}

/**
 * Search + filter + paginate dishes.
 * All inputs are validated by the caller.
 */
export function queryDishes({ search = '', category = '', page = 1, pageSize = 8 } = {}) {
  let results = getAllDishes();

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
    );
  }

  if (category) {
    results = results.filter((d) => d.category === category);
  }

  const total = results.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const items = results.slice(start, start + pageSize);

  return { items, total, page: safePage, totalPages, pageSize };
}

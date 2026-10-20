import { getAllDishes } from '../lib/dishes';

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default function sitemap() {
  const dishes = getAllDishes();

  const staticRoutes = [
    { url: `${appUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${appUrl}/menu`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ];

  const dishRoutes = dishes.map((dish) => ({
    url: `${appUrl}/menu/${dish.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Excluded: /cart, /checkout, /orders, /signin, /kitchen, /dashboard, /favorites
  return [...staticRoutes, ...dishRoutes];
}

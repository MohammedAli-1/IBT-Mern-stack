import foods from "./Data/foods";

const BASE = "https://addis-eats.vercel.app";

export default function sitemap() {
  const dishUrls = foods.map((food) => ({
    url: `${BASE}/menu/${food.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/menu`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    ...dishUrls,
    // /cart, /checkout, /orders, /kitchen are private — excluded from sitemap
  ];
}

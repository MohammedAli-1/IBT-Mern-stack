const BASE = "https://addis-eats.vercel.app";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/checkout", "/orders", "/kitchen"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}

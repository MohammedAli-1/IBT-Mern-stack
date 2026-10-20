const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/menu', '/menu/'],
        disallow: [
          '/cart',
          '/checkout',
          '/orders',
          '/signin',
          '/kitchen',
          '/dashboard',
          '/favorites',
          '/api/',
        ],
      },
    ],
    sitemap: `${appUrl}/sitemap.xml`,
  };
}

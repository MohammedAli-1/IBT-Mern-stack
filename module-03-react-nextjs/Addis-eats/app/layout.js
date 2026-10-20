import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CartProvider from '../components/CartProvider';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(appUrl),
  title: {
    template: '%s | Addis Eats',
    default: 'Addis Eats — Authentic Ethiopian Food Delivery',
  },
  description:
    'Order authentic Ethiopian food online. Doro Wat, Tibs, Shiro, and more — delivered to your door in Addis Ababa.',
  keywords: ['Ethiopian food', 'Addis Ababa delivery', 'Doro Wat', 'injera', 'Ethiopian restaurant'],
  openGraph: {
    siteName: 'Addis Eats',
    type: 'website',
    locale: 'en_US',
    url: appUrl,
    title: 'Addis Eats — Authentic Ethiopian Food Delivery',
    description:
      'Order authentic Ethiopian food online. Delivered hot and fresh across Addis Ababa.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Addis Eats — Authentic Ethiopian Food Delivery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Addis Eats',
    description: 'Authentic Ethiopian food delivered to your door.',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body style={{ fontFamily: 'var(--font-geist, sans-serif)' }}>
        <CartProvider>
          <Nav />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

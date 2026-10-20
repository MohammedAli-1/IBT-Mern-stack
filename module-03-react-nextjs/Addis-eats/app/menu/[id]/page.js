import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getDishById, getAllDishes } from '../../../lib/dishes';
import AddToCartButton from './AddToCartButton';

export async function generateStaticParams() {
  return getAllDishes().map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = getDishById(id);
  if (!dish) return { title: 'Dish Not Found' };
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return {
    title: dish.name,
    description: dish.description,
    openGraph: {
      title: `${dish.name} | Addis Eats`,
      description: dish.description,
      images: [{ url: `${appUrl}/menu/${id}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = getDishById(id);
  if (!dish) notFound();

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const canonicalUrl = `${appUrl}/menu/${dish.id}`;
  const imageUrl = dish.image.startsWith('http') ? dish.image : `${appUrl}${dish.image}`;

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: dish.name,
    description: dish.description,
    image: imageUrl,
    url: canonicalUrl,
    offers: {
      '@type': 'Offer',
      price: String(dish.price),
      priceCurrency: 'ETB',
      availability: dish.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    suitableForDiet: dish.category === 'Vegetarian'
      ? ['https://schema.org/VegetarianDiet']
      : undefined,
  };

  return (
    <div className="container" style={{ padding: '2rem 0 4rem' }}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', maxWidth: '900px', margin: '0 auto', overflow: 'hidden' }}>
        <div style={{ position: 'relative', minHeight: '380px' }}>
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {dish.category}
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, lineHeight: 1.2, color: 'var(--color-primary-dark)' }}>{dish.name}</h1>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{dish.description}</p>
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Neighbourhood</div>
            <div style={{ fontWeight: 600 }}>{dish.neighbourhood}</div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-primary)', marginTop: '0.5rem' }}>
            ETB {dish.price}
          </div>
          <AddToCartButton dish={dish} />
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .dish-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

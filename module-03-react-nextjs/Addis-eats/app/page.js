import Link from 'next/link';
import Image from 'next/image';
import { getAllDishes } from '../lib/dishes';
import DeliveryMap from '../components/DeliveryMap';

export const metadata = {
  title: 'Addis Eats — Authentic Ethiopian Food Delivery',
  description: 'Order fresh, authentic Ethiopian dishes online. Doro Wat, Tibs, Shiro and more delivered across Addis Ababa.',
};

export default function HomePage() {
  const featured = getAllDishes().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #c8390c 0%, #a02d09 60%, #1a1a1a 100%)',
        color: '#fff',
        padding: '5rem 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '1rem' }}>
            Ethiopia on Every Plate
          </h1>
          <p style={{ fontSize: '1.15rem', maxWidth: '540px', margin: '0 auto 2rem', opacity: 0.9 }}>
            Fresh injera, slow-cooked stews, and bold spices — delivered hot to your door anywhere in Addis Ababa.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/menu" className="btn btn-secondary" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
              Browse Menu
            </Link>
            <Link href="/signin" className="btn btn-outline" style={{ fontSize: '1rem', padding: '0.75rem 2rem', borderColor: '#fff', color: '#fff' }}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Featured dishes */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>
            Today&apos;s Favourites
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            The dishes our customers keep coming back for.
          </p>
          <div className="grid-cards">
            {featured.map((dish, i) => (
              <Link key={dish.id} href={`/menu/${dish.id}`} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '200px' }}>
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    priority={i === 0}
                  />
                </div>
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{dish.name}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', flex: 1 }}>{dish.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                    <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>ETB {dish.price}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{dish.category}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/menu" className="btn btn-primary" style={{ padding: '0.75rem 2.5rem' }}>
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: 'var(--color-primary-light)', padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, textAlign: 'center', marginBottom: '2.5rem', color: 'var(--color-primary-dark)' }}>
            How Addis Eats Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {[
              { icon: '🍽️', step: '1', title: 'Browse Menu', desc: 'Explore authentic Ethiopian dishes organised by category.' },
              { icon: '🛒', step: '2', title: 'Add to Cart', desc: 'Select your favourites and adjust quantities.' },
              { icon: '📦', step: '3', title: 'Checkout', desc: 'Enter your delivery details and place your order.' },
              { icon: '🚴', step: '4', title: 'Fast Delivery', desc: 'Track your order status in real time.' },
            ].map((item) => (
              <div key={item.step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ fontSize: '2.5rem' }}>{item.icon}</div>
                <div style={{ width: '32px', height: '32px', background: 'var(--color-primary)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  {item.step}
                </div>
                <h3 style={{ fontWeight: 700 }}>{item.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery map */}
      <section id="delivery-areas" style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>
            Delivery Areas
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            We deliver across three key neighbourhoods in Addis Ababa.
          </p>
          <DeliveryMap />
        </div>
      </section>
    </>
  );
}

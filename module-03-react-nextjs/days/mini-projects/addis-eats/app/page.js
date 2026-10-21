import Link from "next/link";
import Image from "next/image";
import foods from "./Data/foods";

export const metadata = {
  title: "Home",
  description: "Addis-Eats — discover and order delicious Ethiopian and international food delivered to your door in Addis Ababa.",
};

const features = [
  { icon: "🚀", title: "Fast Delivery", desc: "Hot food at your door in under 45 minutes." },
  { icon: "🍽️", title: "100+ Dishes", desc: "Ethiopian classics, fast food, breakfast and more." },
  { icon: "🔒", title: "Secure Orders", desc: "Pay safely and track every order in real time." },
];

export default function Home() {
  // Pick one dish from each of 4 different categories
  const featured = ["Ethiopian", "Fast Food", "Breakfast", "Desserts"].map(
    (cat) => foods.find((f) => f.category === cat)
  ).filter(Boolean);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-orange-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-20 text-center lg:flex-row lg:text-left">
          <div className="flex-1">
            <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white">
              🇪🇹 Addis Ababa's #1 Food App
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Delicious food,<br />delivered fast.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-orange-100">
              Order from the best local restaurants in Addis Ababa. Ethiopian cuisine, fast food, breakfast — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link
                href="/menu"
                className="rounded-xl bg-white px-8 py-3.5 font-bold text-orange-600 shadow-lg transition hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Browse Menu
              </Link>
              <Link
                href="/register"
                className="rounded-xl border-2 border-white px-8 py-3.5 font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Sign Up Free
              </Link>
            </div>
          </div>

          <div className="relative h-72 w-full max-w-sm flex-shrink-0 overflow-hidden rounded-3xl shadow-2xl lg:h-96 lg:max-w-md">
            <Image
              src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=900"
              alt="Doro Wot — traditional Ethiopian dish"
              fill
              sizes="(max-width: 1024px) 100vw, 448px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <p className="absolute bottom-4 left-4 text-sm font-semibold text-white drop-shadow">🇪🇹 Doro Wot — Ethiopian Classic</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-orange-50 p-6 text-center">
                <div className="text-4xl">{f.icon}</div>
                <h3 className="mt-3 text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="bg-orange-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Featured Dishes</h2>
            <Link href="/menu" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
              View all →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((food) => (
              <Link
                key={food.id}
                href={`/menu/${food.id}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                <div className="relative h-48">
                  <Image
                    src={food.image}
                    alt={food.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                    {food.category}
                  </span>
                  <h3 className="mt-2 font-bold text-gray-900">{food.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-orange-600">{food.price} ETB</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gray-900 py-16 text-center">
        <h2 className="text-3xl font-bold text-white">Ready to order?</h2>
        <p className="mt-3 text-gray-400">Create a free account and get your first order in minutes.</p>
        <Link
          href="/register"
          className="mt-8 inline-block rounded-xl bg-orange-600 px-8 py-3.5 font-bold text-white transition hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}

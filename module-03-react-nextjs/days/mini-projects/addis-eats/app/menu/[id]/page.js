import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import foods from "@/app/Data/foods";
import AddToCartButton from "@/app/components/AddToCartButton";
// Revalidate eligible static pages after 60 seconds
export const revalidate = 60;

// Pre-render a page for every food at build time
export function generateStaticParams() {
  return foods.map((food) => ({
    id: String(food.id),
  }));
}

// Ex 3: dynamic metadata using the dish's name, price and description
export async function generateMetadata({ params }) {
  const { id } = await params;
  const food = foods.find((item) => item.id === Number(id));
  if (!food) return { title: "Dish not found" };

  return {
    title: food.name,
    description: `${food.description} — ${food.price} ETB. Order now on Addis-Eats.`,
    openGraph: {
      title: food.name,
      description: `${food.description} — ${food.price} ETB`,
      images: [{ url: food.image, width: 800, height: 600, alt: food.name }],
    },
  };
}

export default async function DishPage({ params }) {
  // Get the dish ID from the URL
  const { id } = await params;

  // Find the matching dish
  const food = foods.find((item) => item.id === Number(id));

  // Show the 404 page if the dish doesn't exist
  if (!food) {
    notFound();
  }

  return (
    <main className="min-h-[80vh] bg-orange-50 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MenuItem",
            name: food.name,
            description: food.description,
            offers: { "@type": "Offer", price: food.price, priceCurrency: "ETB", availability: "https://schema.org/InStock" },
            image: food.image,
          }),
        }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link href="/menu" className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700">
          ← Back to Menu
        </Link>

        <article className="mt-5 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="relative h-80 w-full sm:h-96">
            <Image src={food.image} alt={food.name} fill sizes="(max-width: 896px) 100vw, 896px" className="object-cover" priority />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-orange-700 shadow">
              {food.category}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-extrabold text-gray-900">{food.name}</h1>
            <p className="mt-3 text-base leading-7 text-gray-600">{food.description}</p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-3xl font-bold text-orange-600">{food.price} ETB</p>
              <AddToCartButton food={food} />
            </div>

            <div className="mt-6 rounded-xl bg-orange-50 p-4 text-sm text-gray-600">
              🕒 Ready in 20–35 minutes &nbsp;·&nbsp; 🚚 Free delivery &nbsp;·&nbsp; ⭐ Fresh daily
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

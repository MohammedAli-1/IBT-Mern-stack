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

export default async function DishPage({ params }) {
  // Get the dish ID from the URL
  const { id } = await params;

  // Find the matching dish
  const food = foods.find((item) => item.id === Number(id));

  // Show the 404 page if the dish doesn't exist
  if (!food) {
    notFound();
  }

  // Display when this page's HTML was rendered
  const generatedAt = new Date().toLocaleString();

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/menu"
        className="mb-6 inline-block text-orange-600 hover:text-orange-700"
      >
        ← Back to Menu
      </Link>

      <article className="overflow-hidden rounded-2xl border shadow-sm">
        {/* priority on the hero — largest above-the-fold image, improves LCP */}
        <div className="relative h-72 w-full">
          <Image
            src={food.image}
            alt={food.name}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
            {food.category}
          </p>

          <h1 className="text-3xl font-bold">{food.name}</h1>

          <p className="leading-7 text-gray-600">{food.description}</p>

          <p className="text-2xl font-bold text-orange-600">{food.price} ETB</p>

          <div className="rounded-lg bg-gray-100 p-3 text-sm text-gray-600">
            <strong>Page generated at:</strong> {generatedAt}
          </div>

          <AddToCartButton food={food} />
        </div>
      </article>
    </main>
  );
}

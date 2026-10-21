import { Suspense } from "react";
import foods from "../Data/foods";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "../components/AddToCartButton";
import FilterShell from "../components/FilterShell";

export const revalidate = 60;

// Canonical always points at /menu without query params so Google doesn't
// index ?category=Ethiopian as a separate page.
export async function generateMetadata({ searchParams }) {
  const { category } = await searchParams;
  return {
    title: category ? `${category} — Menu` : "Menu",
    description:
      "Browse our full menu of Ethiopian dishes, fast food, breakfast, drinks and desserts. Order online for delivery in Addis Ababa.",
    alternates: {
      canonical: "https://addis-eats.vercel.app/menu",
    },
  };
}

// Server component — awaits and renders the dish list
async function FoodList({ category }) {
  const filteredFoods =
    !category || category === "All Foods"
      ? foods
      : foods.filter((food) => food.category === category);

  return (
    <>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {filteredFoods.map((food) => (
          <article key={food.id} className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="relative h-52">
              <Image
                src={food.image}
                alt={food.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-orange-700 shadow-sm">
                {food.category}
              </span>
            </div>
            <div className="p-4">
              <h2 className="font-bold text-gray-900">{food.name}</h2>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{food.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-orange-600">{food.price} ETB</span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/menu/${food.id}`}
                    className="rounded-lg border border-orange-200 px-3 py-1.5 text-sm font-medium text-orange-600 transition hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  >
                    Details
                  </Link>
                  <AddToCartButton food={food} compact />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <p className="mt-6 text-gray-600">No foods found in this category.</p>
      )}
    </>
  );
}

export default async function FoodsPage({ searchParams }) {
  const { category } = await searchParams;

  return (
    <section>
      <h1 className="text-3xl font-bold text-gray-900">
        {category || "All Foods"}
      </h1>

      {/* FilterShell is a client component; FoodList is passed as children
          so the server tree stays decoupled from the client boundary */}
      <FilterShell currentCategory={category}>
        <Suspense fallback={<p className="mt-6 text-gray-500">Loading dishes...</p>}>
          <FoodList category={category} />
        </Suspense>
      </FilterShell>
    </section>
  );
}

import { Suspense } from "react";
import foods from "../Data/foods";
import Link from "next/link";
import AddToCartButton from "../components/AddToCartButton";
import FilterShell from "../components/FilterShell";

export const revalidate = 60;

// Server component — awaits and renders the dish list
async function FoodList({ category }) {
  const filteredFoods =
    !category || category === "All Foods"
      ? foods
      : foods.filter((food) => food.category === category);

  return (
    <>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {filteredFoods.map((food) => (
          <article key={food.id} className="rounded-xl bg-white p-4 shadow-sm">
            <div className="h-[350px] md:h-[400px]">
              <img
                src={food.image}
                alt={food.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold">{food.name}</h2>
            <p className="mt-2 text-gray-600">{food.price} ETB</p>
            <div className="mt-3 flex items-center justify-between">
              <Link
                href={`/menu/${food.id}`}
                className="font-semibold text-orange-600 hover:text-orange-700"
              >
                View Details →
              </Link>
              <AddToCartButton food={food} compact />
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

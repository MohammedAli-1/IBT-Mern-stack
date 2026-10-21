import Link from "next/link";

export default function MenuLayout({ children }) {
  const categories = [
    "All Foods",
    "Ethiopian",
    "Fast Food",
    "Breakfast",
    "Drinks",
    "Desserts",
  ];

  return (
    <section className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6">
      <aside className="hidden w-52 shrink-0 md:block">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Categories</h2>
        <nav className="flex flex-col gap-1">
          {categories.map((category) => (
            <Link
              key={category}
              href={category === "All Foods" ? "/menu" : `/menu?category=${encodeURIComponent(category)}`}
              className="block rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-orange-100 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              {category}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </section>
  );
}

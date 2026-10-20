import Link from "next/link";
import MenuCounter from "../components/MenuCounter";
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
    <section className="mx-auto flex max-w-7xl gap-8 px-6 py-8">
      <aside className="w-56 shrink-0">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Browse Menu</h2>
        <nav className="flex flex-col gap-2">
          {categories.map((category) => (
            <Link
              key={category}
              href={
                category === "All Foods"
                  ? "/menu"
                  : `/menu?category=${encodeURIComponent(category)}`
              }
              className="block rounded-lg px-4 py-3 text-gray-700 transition hover:bg-orange-100 hover:text-orange-700"
            >
              {category}
            </Link>
          ))}
        </nav>
        <MenuCounter />
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </section>
  );
}

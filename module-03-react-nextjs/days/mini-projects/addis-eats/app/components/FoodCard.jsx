import Link from "next/link";
import Image from "next/image";

export default function FoodCard({ food }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={food.image}
          alt={food.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">{food.name}</h2>

          <span className="whitespace-nowrap font-bold text-orange-600">
            {food.price} ETB
          </span>
        </div>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {food.description}
        </p>

        <div className="mt-4">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
            {food.category}
          </span>
        </div>
        <Link
          href={`/foods/${food.id}`}
          className="mt-5 block w-full rounded-xl bg-orange-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-orange-700"
        >
          {" "}
          View Details{" "}
        </Link>
      </div>
    </article>
  );
}

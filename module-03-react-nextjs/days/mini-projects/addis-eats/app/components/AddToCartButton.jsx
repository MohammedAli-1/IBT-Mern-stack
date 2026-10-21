"use client";

import { useCart } from "../context/cartContext";

export default function AddToCartButton({ food, compact = false }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(food)}
      className={
        compact
          ? "min-h-[44px] rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1"
          : "mt-8 min-h-[44px] w-full rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1 md:w-auto"
      }
    >
      {compact ? "+ Add" : "Add to Cart"}
    </button>
  );
}

"use client";

import { useCart } from "../context/cartContext";

export default function AddToCartButton({ food, compact = false }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(food)}
      className={
        compact
          ? "rounded-lg bg-orange-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-orange-700"
          : "mt-8 w-full rounded-xl bg-orange-600 px-6 py-4 font-semibold text-white transition hover:bg-orange-700 md:w-auto"
      }
    >
      {compact ? "+ Add" : "Add to Cart"}
    </button>
  );
}

"use client";

import { useCart } from "../context/cartContext";

export default function AddToCartButton({ food }) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(food);
    
  }

  return (
    <button
      onClick={handleAddToCart}
      className="mt-8 w-full rounded-xl bg-orange-600 px-6 py-4 font-semibold text-white transition hover:bg-orange-700 md:w-auto"
    >
      Add to Cart
    </button>
  );
}

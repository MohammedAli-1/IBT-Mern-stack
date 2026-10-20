"use client";

import { useCart } from "../context/cartContext";

// Only this component needs interactivity — quantity controls and remove button
export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-5 sm:flex-row">
        <img
          src={item.image}
          alt={item.name}
          className="h-40 w-full rounded-xl object-cover sm:h-32 sm:w-32"
        />

        <div className="flex flex-1 flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
              <p className="mt-1 text-sm text-gray-500">{item.category}</p>
            </div>
            <p className="whitespace-nowrap font-bold text-orange-600">
              {item.price} ETB
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center rounded-lg border border-gray-200">
              <button
                className="px-3 py-1.5 text-lg font-semibold text-gray-600 hover:bg-gray-100"
                onClick={() => decreaseQuantity(item.id)}
              >
                −
              </button>
              <span className="min-w-10 text-center font-semibold">
                {item.quantity}
              </span>
              <button
                onClick={() => increaseQuantity(item.id)}
                className="px-3 py-1.5 text-lg font-semibold text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Subtotal:
              <span className="ml-1 font-bold text-gray-900">
                {item.price * item.quantity} ETB
              </span>
            </p>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-sm font-semibold text-red-500 transition hover:text-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

"use client";

import Image from "next/image";
import { useCart } from "../context/cartContext";

// Only this component needs interactivity — quantity controls and remove button
export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="relative h-40 w-full shrink-0 rounded-xl overflow-hidden sm:h-32 sm:w-32">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, 128px"
            className="object-cover"
          />
        </div>

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
                aria-label={`Decrease quantity of ${item.name}`}
                className="flex h-11 w-11 items-center justify-center text-lg font-semibold text-gray-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-l-lg"
                onClick={() => decreaseQuantity(item.id)}
              >
                −
              </button>
              <span className="min-w-10 text-center font-semibold" aria-live="polite">
                {item.quantity}
              </span>
              <button
                aria-label={`Increase quantity of ${item.name}`}
                onClick={() => increaseQuantity(item.id)}
                className="flex h-11 w-11 items-center justify-center text-lg font-semibold text-gray-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-r-lg"
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
              aria-label={`Remove ${item.name} from cart`}
              onClick={() => removeFromCart(item.id)}
              className="min-h-[44px] min-w-[44px] rounded-lg px-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

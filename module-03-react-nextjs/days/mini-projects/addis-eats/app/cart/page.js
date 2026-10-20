"use client";

import Link from "next/link";
import { useCart } from "../context/cartContext";

export default function CartPage() {
  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    cartTotal,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-[70vh] bg-orange-50 px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-4xl">
              🛒
            </div>

            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              Your Cart is Empty
            </h1>

            <p className="mx-auto mt-3 max-w-md leading-7 text-gray-500">
              Looks like you haven't added any delicious food yet. Browse our
              menu and find something you'll love.
            </p>

            <Link
              href="/menu"
              className="mt-8 inline-flex rounded-xl bg-orange-600 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-orange-700"
            >
              Browse Foods
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-orange-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>

          <p className="mt-2 text-gray-600">
            Review your selected meals before checkout.
          </p>
        </div>

        {/* Cart Layout */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Cart Items */}
          <section className="space-y-4">
            {cart.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full rounded-xl object-cover sm:h-32 sm:w-32"
                  />

                  {/* Information */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">
                            {item.name}
                          </h2>

                          <p className="mt-1 text-sm text-gray-500">
                            {item.category}
                          </p>
                        </div>

                        <p className="whitespace-nowrap font-bold text-orange-600">
                          {item.price} ETB
                        </p>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      {/* Quantity */}
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

                      {/* Subtotal */}
                      <p className="text-sm text-gray-500">
                        Subtotal:
                        <span className="ml-1 font-bold text-gray-900">
                          {item.price * item.quantity} ETB
                        </span>
                      </p>

                      {/* Remove */}
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
            ))}
          </section>

          {/* Order Summary */}
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

            <div className="mt-6 space-y-4 border-b border-gray-200 pb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{cartTotal} ETB</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>Free</span>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <span className="text-lg font-bold text-gray-900">Total</span>

              <span className="text-xl font-bold text-orange-600">
                {cartTotal} ETB
              </span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-xl bg-orange-600 px-5 py-3.5 text-center font-semibold text-white transition hover:bg-orange-700"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/foods"
              className="mt-3 block w-full rounded-xl border border-gray-200 px-5 py-3.5 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

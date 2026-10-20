"use client";

import Link from "next/link";
import { useCart } from "../context/cartContext";
import CartItem from "../components/CartItem";

export default function CartPage() {
  const { cart, totalItems, cartTotal } = useCart();

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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <p className="mt-2 text-gray-600">
            Review your selected meals before checkout.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </section>

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
              href="/menu"
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

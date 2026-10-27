"use client";

import { useActionState, useEffect } from "react";
import { useCart } from "../context/cartContext";
import { submitOrder } from "../actions/orderActions";

const initialState = { success: false, fieldErrors: {} };

export default function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const [state, formAction, isPending] = useActionState(submitOrder, initialState);

  // Clear the cart as soon as the order is confirmed
  useEffect(() => {
    if (state.success) clearCart();
  }, [state.success]);

  if (state.success) {
    return (
      <div className="rounded-xl bg-green-50 p-8 text-center">
        <div className="text-5xl">🎉</div>
        <p className="mt-3 text-2xl font-bold text-green-700">Order placed!</p>
        <p className="mt-2 text-green-600">Order ID: #{state.orderId}</p>
        <a
          href="/orders"
          className="mt-5 inline-block rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
        >
          View My Orders →
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-6 space-y-5">
      {/* Hidden cart items */}
      <input type="hidden" name="items" value={JSON.stringify(cart)} />

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="name">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          placeholder="Your name"
        />
        {state.fieldErrors?.name && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.name}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          placeholder="+251 9xx xxx xxx"
        />
        {state.fieldErrors?.phone && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.phone}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="address">
          Delivery Address
        </label>
        <textarea
          id="address"
          name="address"
          rows={3}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          placeholder="Your full delivery address"
        />
        {state.fieldErrors?.address && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.address}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-orange-600 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1"
      >
        {isPending ? "Placing order…" : "Place Order"}
      </button>
    </form>
  );
}

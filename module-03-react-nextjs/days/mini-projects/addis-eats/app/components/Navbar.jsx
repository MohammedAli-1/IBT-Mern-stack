"use client";

import Link from "next/link";
import { useCart } from "../context/cartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 border-b border-orange-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-orange-600">
          Addis-Eats
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-700 transition hover:text-orange-600"
          >
            Home
          </Link>

          <Link
            href="/menu"
            className="text-gray-700 transition hover:text-orange-600"
          >
            Menu
          </Link>

          <Link
            href="/cart"
            className="flex items-center text-gray-700 transition hover:text-orange-600"
          >
            Cart
            {totalItems > 0 ? (
              <span className="ml-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-orange-600 px-1.5 text-xs font-bold text-white">
                {totalItems}
              </span>
            ) : (
              <span className="ml-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-orange-600 px-1.5 text-xs font-bold text-white">
                0
              </span>
            )}
          </Link>

          <Link
            href="/login"
            className="rounded-lg bg-orange-600 px-4 py-2 font-medium text-white transition hover:bg-orange-700"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

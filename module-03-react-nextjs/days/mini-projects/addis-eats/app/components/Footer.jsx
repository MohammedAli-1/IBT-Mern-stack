import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        {/* About */}
        <div>
          <h2 className="mb-3 text-xl font-bold">Addis-Eats</h2>

          <p className="text-sm leading-6 text-gray-300">
            Discover delicious food from restaurants in Addis Ababa and order
            your favorite meals easily.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="mb-3 text-lg font-semibold">Quick Links</h2>

          <div className="flex flex-col gap-2 text-sm">
            <Link href="/" className="text-gray-300 hover:text-white">
              Home
            </Link>

            <Link href="/foods" className="text-gray-300 hover:text-white">
              Foods
            </Link>

            <Link href="/cart" className="text-gray-300 hover:text-white">
              Cart
            </Link>

            <Link href="/orders" className="text-gray-300 hover:text-white">
              Orders
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="mb-3 text-lg font-semibold">Contact Us</h2>

          <div className="space-y-2 text-sm text-gray-300">
            <p>Addis Ababa, Ethiopia</p>
            <p>+251 928942829</p>
            <p>info@addis-eats.com</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700">
        <p className="py-4 text-center text-sm text-gray-400">
          © 2026 Addis-Eats. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

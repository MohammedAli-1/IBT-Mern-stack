import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-lg">
        <div className="mb-6 text-7xl font-bold text-orange-600">404</div>

        <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>

        <p className="mt-4 leading-7 text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or doesn&apos;t exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

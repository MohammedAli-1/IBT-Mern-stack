import { getSession } from "@/lib/session";
import CheckoutForm from "../components/CheckoutForm";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/checkout");

  return (
    <div className="min-h-[80vh] bg-orange-50 py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <Link href="/cart" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm hover:bg-orange-50">
            ←
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <p className="text-sm text-gray-500">Logged in as {session.email}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-1">Delivery details</h2>
          <p className="text-sm text-gray-500 mb-6">We&apos;ll deliver to the address below.</p>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}

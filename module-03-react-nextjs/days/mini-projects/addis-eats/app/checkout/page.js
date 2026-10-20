import { getSession } from "@/lib/session";
import CheckoutForm from "../components/CheckoutForm";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  // Every private page verifies session while rendering — not only in middleware
  const session = await getSession();
  if (!session) redirect("/login?next=/checkout");

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
      <p className="mt-2 text-gray-600">Complete your order information.</p>
      <p className="mt-2 text-sm text-gray-400">Logged in as: {session.email}</p>
      <CheckoutForm />
    </div>
  );
}

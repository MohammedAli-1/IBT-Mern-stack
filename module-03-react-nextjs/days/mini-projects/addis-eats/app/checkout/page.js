import { cookies } from "next/headers";
import CheckoutForm from "../components/CheckoutForm";

export default async function CheckoutPage() {
  // cookies() opts this route into dynamic rendering — the session cookie is
  // request-specific so the page cannot be pre-rendered at build time.
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
      <p className="mt-2 text-gray-600">Complete your order information.</p>

      {session && (
        <p className="mt-2 text-sm text-gray-400">Logged in as: {session.value}</p>
      )}

      <CheckoutForm />
    </div>
  );
}

import { cookies } from "next/headers";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <p className="mt-2 text-gray-600">Complete your order information.</p>

      {session && (
        <p className="mt-4 text-sm text-gray-500">Session: {session.value}</p>
      )}
    </div>
  );
}

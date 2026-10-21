import Link from "next/link";
import RegisterForm from "../components/RegisterForm";

export const metadata = {
  title: "Create Account",
  description: "Create your free Addis-Eats account and start ordering delicious food in Addis Ababa.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] bg-orange-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="text-center">
            <span className="text-4xl">🍽️</span>
            <h1 className="mt-3 text-2xl font-bold text-gray-900">Create your account</h1>
            <p className="mt-1 text-sm text-gray-500">Join Addis-Eats and order in minutes</p>
          </div>

          <RegisterForm />

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-orange-600 hover:text-orange-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

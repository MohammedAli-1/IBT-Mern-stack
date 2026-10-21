import Link from "next/link";
import LoginForm from "../components/LoginForm";

export const metadata = {
  title: "Login",
  description: "Sign in to your Addis-Eats account to track orders and checkout faster.",
};

export default async function LoginPage({ searchParams }) {
  const { next } = await searchParams;
  const safeNext = next?.startsWith("/") ? next : "/";

  return (
    <div className="min-h-[80vh] bg-orange-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="text-center">
            <span className="text-4xl">🔐</span>
            <h1 className="mt-3 text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">Sign in to your Addis-Eats account</p>
          </div>

          <LoginForm next={safeNext} />

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-orange-600 hover:text-orange-700">
              Sign up free
            </Link>
          </p>

          <div className="mt-4 rounded-lg bg-orange-50 p-3 text-xs text-gray-500">
            <p><strong>Demo accounts:</strong></p>
            <p>User: user@addis-eats.com / password123</p>
            <p>Staff: staff@addis-eats.com / staffpass</p>
          </div>
        </div>
      </div>
    </div>
  );
}

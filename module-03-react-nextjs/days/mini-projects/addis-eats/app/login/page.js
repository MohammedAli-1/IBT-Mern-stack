import LoginForm from "../components/LoginForm";

export const metadata = {
  title: "Login",
  description: "Sign in to your Addis-Eats account to track orders and checkout faster.",
};

export default async function LoginPage({ searchParams }) {
  const { next } = await searchParams;

  // Ex 5: only pass next if it starts with a slash — reject open redirects
  const safeNext = next?.startsWith("/") ? next : "/";

  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Login</h1>
      <p className="mt-2 text-gray-600">Login to your Addis-Eats account.</p>
      <LoginForm next={safeNext} />
    </div>
  );
}

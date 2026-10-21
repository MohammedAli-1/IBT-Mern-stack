"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsPending(true);
    setErrors({});

    const fd = new FormData(e.target);
    const name = fd.get("name")?.toString().trim();
    const email = fd.get("email")?.toString().trim();
    const password = fd.get("password")?.toString();
    const confirm = fd.get("confirm")?.toString();
    const phone = fd.get("phone")?.toString().trim();

    const fieldErrors = {};
    if (!name || name.length < 2) fieldErrors.name = "Name must be at least 2 characters.";
    if (!email || !/\S+@\S+\.\S+/.test(email)) fieldErrors.email = "Enter a valid email.";
    if (!phone || !/^\+?[\d\s\-]{7,15}$/.test(phone)) fieldErrors.phone = "Enter a valid phone number.";
    if (!password || password.length < 6) fieldErrors.password = "Password must be at least 6 characters.";
    if (password !== confirm) fieldErrors.confirm = "Passwords do not match.";

    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      setIsPending(false);
      return;
    }

    // Simulate registration (replace with real API call)
    await new Promise((r) => setTimeout(r, 800));
    setSuccess(true);
    setIsPending(false);
    setTimeout(() => router.push("/login"), 1500);
  }

  if (success) {
    return (
      <div className="mt-6 rounded-xl bg-green-50 p-6 text-center">
        <p className="text-xl font-bold text-green-700">Account created!</p>
        <p className="mt-1 text-sm text-green-600">Redirecting to login…</p>
      </div>
    );
  }

  const inputClass = "mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200";
  const labelClass = "block text-sm font-medium text-gray-700";
  const errorClass = "mt-1 text-xs text-red-600";

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label className={labelClass} htmlFor="reg-name">Full Name</label>
        <input id="reg-name" name="name" type="text" placeholder="Abebe Bekele" className={inputClass} />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="reg-email">Email</label>
        <input id="reg-email" name="email" type="email" placeholder="you@example.com" className={inputClass} />
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="reg-phone">Phone</label>
        <input id="reg-phone" name="phone" type="tel" placeholder="+251 9xx xxx xxx" className={inputClass} />
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="reg-password">Password</label>
        <input id="reg-password" name="password" type="password" placeholder="Min. 6 characters" className={inputClass} />
        {errors.password && <p className={errorClass}>{errors.password}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="reg-confirm">Confirm Password</label>
        <input id="reg-confirm" name="confirm" type="password" placeholder="Repeat password" className={inputClass} />
        {errors.confirm && <p className={errorClass}>{errors.confirm}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-full min-h-[44px] rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1"
      >
        {isPending ? "Creating account…" : "Create Account"}
      </button>
    </form>
  );
}

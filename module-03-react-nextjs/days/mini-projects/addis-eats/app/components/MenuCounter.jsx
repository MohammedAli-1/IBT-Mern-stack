"use client";

import { useState } from "react";

export default function MenuCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="mt-6 rounded-xl bg-orange-50 p-4">
      <h3 className="font-semibold text-gray-900">
        Menu Navigation Counter
      </h3>

      <p className="mt-2 text-gray-600">
        Count: {count}
      </p>

      <button
        onClick={() => setCount((current) => current + 1)}
        className="mt-3 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
      >
        Increase Count
      </button>
    </div>
  );
}

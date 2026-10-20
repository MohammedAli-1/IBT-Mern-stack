"use client";

// FilterShell owns client-side UI (active highlight, future search input, etc.)
// but receives the server-rendered dish list as children — no import coupling.
export default function FilterShell({ currentCategory, children }) {
  return (
    <div>
      {currentCategory && (
        <p className="mb-2 text-sm text-orange-600 font-medium">
          Filtered by: {currentCategory}
        </p>
      )}
      {children}
    </div>
  );
}

"use client";

import { CartProvider } from "../context/cartContext";

// Wraps the tree in all client-side providers.
// Kept in its own file so layout.js stays a server component.
export default function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}

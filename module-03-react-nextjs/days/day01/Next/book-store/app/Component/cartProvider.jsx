"use client";
import { useContext, createContext, useState, Children } from "react";
const cartContext = createContext(null);
export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  function AddToCart(book) {
    setCart((prevs) => [...prevs, book]);
  }
  function removeFromCart(id) {
    setCart((prevs) => prevs.filter((book) => book.id !== id));
  }
  function clearCart() {
    setCart(null);
  }
  return (
    <cartContext.Provider
      value={{ cart, AddToCart, removeFromCart, clearCart }}
    >
      {children}
    </cartContext.Provider>
  );
}
export const useCart = () => {
  const context = useContext(cartContext);
  // Throwing an explicit error helps debug missing providers immediately
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

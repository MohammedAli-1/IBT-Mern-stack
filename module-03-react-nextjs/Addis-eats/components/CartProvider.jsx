'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('addiseats_cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem('addiseats_cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  function addItem(dish, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.dishId === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.dishId === dish.id
            ? { ...i, quantity: Math.min(20, i.quantity + quantity) }
            : i
        );
      }
      return [...prev, { dishId: dish.id, name: dish.name, price: dish.price, image: dish.image, quantity }];
    });
  }

  function removeItem(dishId) {
    setItems((prev) => prev.filter((i) => i.dishId !== dishId));
  }

  function updateQuantity(dishId, quantity) {
    if (quantity < 1) { removeItem(dishId); return; }
    setItems((prev) =>
      prev.map((i) => (i.dishId === dishId ? { ...i, quantity: Math.min(20, quantity) } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, total }}>
      {children}
    </CartContext.Provider>
  );
}

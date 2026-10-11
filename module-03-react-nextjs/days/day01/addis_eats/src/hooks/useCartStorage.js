import { useEffect } from "react";

const STORAGE_KEY = "addis-eats-cart";

export function getInitialCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Could not load cart:", error);
    return [];
  }
}

function useCartStorage(cart) {
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);
}

export default useCartStorage;

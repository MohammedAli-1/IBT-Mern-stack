"use client";
import { useCart } from "./cartProvider";
export default function AddToCartButton({ book }) {
  const { cart, AddToCart } = useCart();
  function handleAddToCart() {
    AddToCart(book);
  }

  return <button onClick={handleAddToCart}>AddToCart</button>;
}

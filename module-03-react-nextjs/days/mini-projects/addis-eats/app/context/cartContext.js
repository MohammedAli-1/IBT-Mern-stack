"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  function addToCart(food) {
    setCart((currentCart) => {
      const existingFood = currentCart.find((item) => item.id === food.id);

      if (existingFood) {
        return currentCart.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          ...food,
          quantity: 1,
        },
      ];
    });
  }

  function increaseQuantity(foodId) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === foodId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  }

  function decreaseQuantity(foodId) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === foodId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(foodId) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== foodId));
  }

  function clearCart() {
    setCart([]);
  }

  // Total number of food items
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Total price
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

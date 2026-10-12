import { createContext, useContext } from "react";
import useCartState from "../hooks/useCart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { cart, dispatch } = useCartState();

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}

export default CartContext;

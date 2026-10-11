import { useReducer } from "react";
import cartReducer from "../reducer/cartReducer";
import useCartStorage, { getInitialCart } from "./useCartStorage";

function useCart() {
  const [cart, dispatch] = useReducer(cartReducer, undefined, getInitialCart);

  useCartStorage(cart);

  return { cart, dispatch };
}

export default useCart;

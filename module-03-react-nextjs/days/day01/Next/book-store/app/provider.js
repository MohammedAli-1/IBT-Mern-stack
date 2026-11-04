import CartProvider from "./Component/cartProvider";
export default function Provider({ children }) {
  return <CartProvider>{children}</CartProvider>;
}

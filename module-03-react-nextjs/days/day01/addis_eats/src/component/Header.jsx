import { useContext } from "react";
import { cartContext } from "../App";
function Header() {
  const {cart} = useContext(cartContext);
  return (
    <div>
      <h1>Addis Eats</h1>
      <h1>cart Item:{cart.length}</h1>
    </div>
  );
}

export default Header;

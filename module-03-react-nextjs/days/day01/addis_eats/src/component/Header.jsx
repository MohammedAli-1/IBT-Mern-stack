import { NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { useCartContext } from "../context/CartContext";
function Header() {
  const { cart } = useCartContext();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </nav>
      <h1>Addis Eats</h1>
      <p>Delicious Food, Made for You</p>
      <div className="header-actions">
        <ThemeToggle />
        <div className="cart-badge">
          🛒
          <span>{cartCount}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;

import ThemeToggle from "./ThemeToggle";
function Header({ cartCount }) {
  return (
    <header>
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

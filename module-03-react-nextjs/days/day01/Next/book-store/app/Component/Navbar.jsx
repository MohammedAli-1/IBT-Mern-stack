
import Link from "next/link";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="logo">
          BookStore
        </Link>

        <div className="nav-links">
          <Link href="/" className="nav-link">
            Home
          </Link>

          <Link href="/book" className="nav-link">
            Books
          </Link>

          <Link href="/cart" className="nav-link">
            Cart
          </Link>

          <Link href="/checkout" className="nav-link">
            Checkout
          </Link>
        </div>
      </div>
    </nav>
  );
}


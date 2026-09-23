import { Link, NavLink } from "react-router-dom";

import "./Header.css";

function Header() {
  return (
    <header className="public-header">
      {/* ================= LOGO ================= */}

      <Link to="/" className="header-logo">
        <strong>SchoolMS</strong>
        <span>School Management System</span>
      </Link>

      {/* ================= NAVIGATION ================= */}

      <nav className="header-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "header-link active" : "header-link"
          }
        >
          Home
        </NavLink>

        <a href="/#features" className="header-link">
          Features
        </a>

        <a href="/#roles" className="header-link">
          Roles
        </a>

        <Link to="/login" className="header-login-button">
          Login
        </Link>
      </nav>
    </header>
  );
}

export default Header;

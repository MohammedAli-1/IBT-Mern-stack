import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        {/* Logo */}
        <NavLink to="/" className="logo">
          Student<span>Hub</span>
        </NavLink>

        {/* Navigation Links */}
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          <NavLink to="/courses" className="nav-link">
            Courses
          </NavLink>

          <NavLink to="/students" className="nav-link">
            Students
          </NavLink>

          <NavLink to="/profile" className="nav-link">
            Profile
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;

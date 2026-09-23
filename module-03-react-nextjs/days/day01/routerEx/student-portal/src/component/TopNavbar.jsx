import { NavLink, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

function TopNavbar({ onMenuClick }) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="top-navbar">
      {/* ================= MOBILE MENU ================= */}

      <button
        className="mobile-menu-button"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* ================= TITLE ================= */}

      <div className="navbar-title">
        <h3>School Management System</h3>

        <span>2026/2027 Academic Year</span>
      </div>

      {/* ================= RIGHT SIDE ================= */}

      <div className="navbar-right">
        {/* ================= PROFILE ================= */}

        <NavLink to="/profile" className="top-nav-link">
          👤
          <span>Profile</span>
        </NavLink>

        {/* ================= SETTINGS ================= */}

        <NavLink to="/settings" className="top-nav-link">
          ⚙️
          <span>Settings</span>
        </NavLink>

        {/* ================= LOGOUT ================= */}

        <button
          type="button"
          className="top-logout-button"
          onClick={handleLogout}
        >
          🚪
          <span>Logout</span>
        </button>

        {/* ================= USER ================= */}

        <div className="navbar-user">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="user-info">
            <strong>{user?.name}</strong>

            <span>{user?.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;

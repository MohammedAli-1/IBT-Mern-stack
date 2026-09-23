import { Outlet } from "react-router-dom";

import "./AuthLayout.css";

function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-brand">
        <h1>SchoolMS</h1>
        <p>School Management System</p>
      </div>

      <main className="auth-content">
        <Outlet />
      </main>

      <footer className="auth-footer">© 2026 School Management System</footer>
    </div>
  );
}

export default AuthLayout;

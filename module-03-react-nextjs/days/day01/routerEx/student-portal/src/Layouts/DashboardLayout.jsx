import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../component/Sidebar";
import TopNavbar from "../component/TopNavbar";

import "./DashboardLayout.css";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      {/* ================= SIDEBAR ================= */}

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* ================= MOBILE OVERLAY ================= */}

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      {/* ================= MAIN ================= */}

      <div className="dashboard-main">
        <TopNavbar onMenuClick={toggleSidebar} />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

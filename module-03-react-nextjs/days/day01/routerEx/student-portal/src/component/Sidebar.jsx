import { NavLink } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

function Sidebar({ isOpen, onClose }) {
  const user = useAuthStore((state) => state.user);

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      {/* ================= LOGO ================= */}

      <div className="sidebar-logo">
        <h2>SchoolMS</h2>
        <span>School Management</span>
      </div>

      {/* ================= CLOSE BUTTON ================= */}

      <button className="sidebar-close" onClick={onClose}>
        ✕
      </button>

      {/* ================= NAVIGATION ================= */}

      <nav className="sidebar-nav">
        {/* ================= COMMON ================= */}

        <NavLink to="/dashboard">
          📊
          <span>Dashboard</span>
        </NavLink>

        {/* ================= ADMIN ================= */}

        {user?.role === "admin" && (
          <>
            <NavLink to="/students">
              👨‍🎓
              <span>Students</span>
            </NavLink>

            <NavLink to="/teachers">
              👨‍🏫
              <span>Teachers</span>
            </NavLink>

            <NavLink to="/courses">
              📚
              <span>Courses</span>
            </NavLink>

            <NavLink to="/classes">
              🏫
              <span>Classes</span>
            </NavLink>

            <NavLink to="/attendance">
              📝
              <span>Attendance</span>
            </NavLink>

            <NavLink to="/grades">
              📈
              <span>Grades</span>
            </NavLink>

            <NavLink to="/timetable">
              🗓️
              <span>Timetable</span>
            </NavLink>

            <NavLink to="/parents">
              👪
              <span>Parents</span>
            </NavLink>

            <NavLink to="/fees">
              💰
              <span>Fees</span>
            </NavLink>

            <NavLink to="/reports">
              📋
              <span>Reports</span>
            </NavLink>
          </>
        )}

        {/* ================= TEACHER ================= */}

        {user?.role === "teacher" && (
          <>
            <NavLink to="/classes">
              🏫
              <span>My Classes</span>
            </NavLink>

            <NavLink to="/students">
              👨‍🎓
              <span>My Students</span>
            </NavLink>

            <NavLink to="/courses">
              📚
              <span>My Courses</span>
            </NavLink>

            <NavLink to="/attendance">
              📝
              <span>Attendance</span>
            </NavLink>

            <NavLink to="/grades">
              📈
              <span>Grades</span>
            </NavLink>

            <NavLink to="/timetable">
              🗓️
              <span>Timetable</span>
            </NavLink>
          </>
        )}

        {/* ================= STUDENT ================= */}

        {user?.role === "student" && (
          <>
            <NavLink to="/courses">
              📚
              <span>My Courses</span>
            </NavLink>

            <NavLink to="/classes">
              🏫
              <span>My Class</span>
            </NavLink>

            <NavLink to="/attendance">
              📝
              <span>Attendance</span>
            </NavLink>

            <NavLink to="/grades">
              📈
              <span>My Grades</span>
            </NavLink>

            <NavLink to="/timetable">
              🗓️
              <span>Timetable</span>
            </NavLink>
          </>
        )}

        {/* ================= PARENT ================= */}

        {user?.role === "parent" && (
          <>
            <NavLink to="/students">
              👨‍🎓
              <span>My Children</span>
            </NavLink>

            <NavLink to="/attendance">
              📝
              <span>Attendance</span>
            </NavLink>

            <NavLink to="/grades">
              📈
              <span>Grades</span>
            </NavLink>

            <NavLink to="/timetable">
              🗓️
              <span>Timetable</span>
            </NavLink>

            <NavLink to="/fees">
              💰
              <span>Fees</span>
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;

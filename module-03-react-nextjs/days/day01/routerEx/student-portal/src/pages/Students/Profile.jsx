import { Link } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";
import { useStudentStore } from "../../store/studentStore";

import "./Profile.css";

function Profile() {
  const user = useAuthStore((state) => state.user);

  const students = useStudentStore((state) => state.students);

  const currentStudent = students.find(
    (student) => Number(student.id) === Number(user?.studentId),
  );

  if (!currentStudent) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <h2>Student profile not found</h2>

          <p>We could not find your student information.</p>

          <Link to="/dashboard">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* =========================
            HEADER
        ========================= */}

        <div className="profile-header">
          <div>
            <h1>My Profile</h1>

            <p>View your personal school information.</p>
          </div>

          <Link to="/dashboard" className="profile-back-button">
            ← Dashboard
          </Link>
        </div>

        {/* =========================
            PROFILE CARD
        ========================= */}

        <div className="profile-card">
          <div className="profile-top">
            <div className="profile-avatar">
              {currentStudent.name?.charAt(0)?.toUpperCase()}
            </div>

            <div className="profile-main-info">
              <h2>{currentStudent.name}</h2>

              <p>Student</p>

              <span
                className={
                  currentStudent.status === "Active"
                    ? "profile-status active"
                    : "profile-status inactive"
                }
              >
                {currentStudent.status}
              </span>
            </div>
          </div>

          {/* =========================
              INFORMATION
          ========================= */}

          <div className="profile-section">
            <h3>Personal Information</h3>

            <div className="profile-grid">
              <div className="profile-item">
                <span>Full Name</span>
                <strong>{currentStudent.name}</strong>
              </div>

              <div className="profile-item">
                <span>Email</span>
                <strong>{currentStudent.email}</strong>
              </div>

              <div className="profile-item">
                <span>Phone</span>
                <strong>{currentStudent.phone}</strong>
              </div>

              <div className="profile-item">
                <span>Gender</span>
                <strong>{currentStudent.gender}</strong>
              </div>
            </div>
          </div>

          {/* =========================
              ACADEMIC INFORMATION
          ========================= */}

          <div className="profile-section">
            <h3>Academic Information</h3>

            <div className="profile-grid">
              <div className="profile-item">
                <span>Grade</span>
                <strong>Grade {currentStudent.grade}</strong>
              </div>

              <div className="profile-item">
                <span>Section</span>
                <strong>Section {currentStudent.section}</strong>
              </div>

              <div className="profile-item">
                <span>Class ID</span>
                <strong>{currentStudent.classId}</strong>
              </div>

              <div className="profile-item">
                <span>Status</span>
                <strong>{currentStudent.status}</strong>
              </div>
            </div>
          </div>

          {/* =========================
              ACTION
          ========================= */}

          <div className="profile-actions">
            <Link to="/edit-profile" className="edit-profile-button">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

import { Link, useNavigate, useParams } from "react-router-dom";

import { useStudents } from "../context/StudentContext.jsx";
import "./StudentDetails.css";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { students, deleteStudent } = useStudents();

  // =========================================
  // FIND STUDENT
  // =========================================

  const student = students.find((student) => student.id === Number(id));

  // =========================================
  // STUDENT NOT FOUND
  // =========================================

  if (!student) {
    return (
      <div className="student-not-found">
        <h1>Student Not Found</h1>

        <p>The student you are looking for does not exist.</p>

        <Link to="/students" className="back-students-btn">
          Back to Students
        </Link>
      </div>
    );
  }

  // =========================================
  // DELETE
  // =========================================

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`,
    );

    if (!confirmed) {
      return;
    }

    deleteStudent(student.id);

    navigate("/students");
  };

  return (
    <div className="student-details-page">
      {/* =====================================
          HEADER
      ====================================== */}

      <div className="student-details-header">
        <div>
          <Link to="/students" className="back-link">
            ← Back to Students
          </Link>

          <h1>Student Details</h1>

          <p>View and manage student information.</p>
        </div>

        <div className="details-actions">
          <Link
            to={`/students/${student.id}/edit`}
            className="edit-student-btn"
          >
            Edit Student
          </Link>

          <button
            type="button"
            className="delete-student-btn"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {/* =====================================
          STUDENT PROFILE
      ====================================== */}

      <div className="student-profile-card">
        <div className="large-student-avatar">{student.name.charAt(0)}</div>

        <div className="student-profile-info">
          <h2>{student.name}</h2>

          <p>{student.email}</p>

          <span className={`status-badge ${student.status.toLowerCase()}`}>
            {student.status}
          </span>
        </div>
      </div>

      {/* =====================================
          INFORMATION
      ====================================== */}

      <div className="details-grid">
        {/* PERSONAL INFORMATION */}

        <div className="details-card">
          <h2>Personal Information</h2>

          <div className="details-list">
            <div className="detail-item">
              <span>Full Name</span>

              <strong>{student.name}</strong>
            </div>

            <div className="detail-item">
              <span>Email</span>

              <strong>{student.email}</strong>
            </div>

            <div className="detail-item">
              <span>Gender</span>

              <strong>{student.gender}</strong>
            </div>

            <div className="detail-item">
              <span>Phone</span>

              <strong>{student.phone}</strong>
            </div>
          </div>
        </div>

        {/* SCHOOL INFORMATION */}

        <div className="details-card">
          <h2>School Information</h2>

          <div className="details-list">
            <div className="detail-item">
              <span>Student ID</span>

              <strong>{student.id}</strong>
            </div>

            <div className="detail-item">
              <span>Grade</span>

              <strong>Grade {student.grade}</strong>
            </div>

            <div className="detail-item">
              <span>Section</span>

              <strong>{student.section}</strong>
            </div>

            <div className="detail-item">
              <span>Status</span>

              <strong>{student.status}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;

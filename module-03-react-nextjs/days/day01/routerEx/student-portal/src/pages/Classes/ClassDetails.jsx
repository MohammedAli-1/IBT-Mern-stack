import { Link, useNavigate, useParams } from "react-router-dom";

import { useClassStore } from "../../store/classStore";
import { useTeacherStore } from "../../store/teacherStore";
import { useStudentStore } from "../../store/studentStore";
import { useAuthStore } from "../../store/authStore";

import "./ClassDetails.css";

function ClassDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // =========================
  // AUTHENTICATION
  // =========================

  const user = useAuthStore((state) => state.user);

  // =========================
  // CLASS STORE
  // =========================

  const schoolClass = useClassStore((state) =>
    state.classes.find((item) => item.id === Number(id)),
  );

  const deleteClass = useClassStore((state) => state.deleteClass);

  // =========================
  // TEACHER STORE
  // =========================

  const teachers = useTeacherStore((state) => state.teachers);

  // =========================
  // STUDENT STORE
  // =========================

  const students = useStudentStore((state) => state.students);

  // =========================
  // CLASS NOT FOUND
  // =========================

  if (!schoolClass) {
    return (
      <div className="class-details-page">
        <div className="class-details-container">
          <h2>Class not found</h2>

          <Link to="/classes">← Back to Classes</Link>
        </div>
      </div>
    );
  }

  // =========================
  // CURRENT STUDENT
  // =========================

  const currentStudent = students.find(
    (student) => Number(student.id) === Number(user?.studentId),
  );

  // =========================
  // ROLE CHECKS
  // =========================

  const isAdmin = user?.role === "admin";

  const isTeacher = user?.role === "teacher";

  const isStudent = user?.role === "student";

  // =========================
  // TEACHER ACCESS
  // =========================

  const isAssignedTeacher = schoolClass.teacherIds?.includes(
    Number(user?.teacherId),
  );

  // =========================
  // STUDENT ACCESS
  // =========================

  const isStudentClass =
    Number(schoolClass.id) === Number(currentStudent?.classId);

  // =========================
  // TEACHER PROTECTION
  // =========================

  if (isTeacher && !isAssignedTeacher) {
    return (
      <div className="class-details-page">
        <div className="class-details-container">
          <h2>Access Denied</h2>

          <p>You can only view classes assigned to you.</p>

          <Link to="/classes">← Back to My Classes</Link>
        </div>
      </div>
    );
  }

  // =========================
  // STUDENT PROTECTION
  // =========================

  if (isStudent && !isStudentClass) {
    return (
      <div className="class-details-page">
        <div className="class-details-container">
          <h2>Access Denied</h2>

          <p>You can only view your own class.</p>

          <Link to="/classes">← Back to My Class</Link>
        </div>
      </div>
    );
  }

  // =========================
  // FIND CLASS TEACHERS
  // =========================

  const classTeachers = teachers.filter((teacher) =>
    schoolClass.teacherIds?.includes(Number(teacher.id)),
  );

  // =========================
  // DELETE CLASS
  // =========================

  const handleDelete = () => {
    if (!isAdmin && !isAssignedTeacher) {
      alert("You are not allowed to delete this class.");

      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this class?",
    );

    if (!confirmed) {
      return;
    }

    deleteClass(schoolClass.id);

    navigate("/classes");
  };

  // =========================
  // PAGE
  // =========================

  return (
    <div className="class-details-page">
      <div className="class-details-container">
        {/* =========================
            HEADER
        ========================= */}

        <div className="class-details-header">
          <div>
            <h1>{schoolClass.name}</h1>

            <p>Class information and assigned teachers</p>
          </div>

          <Link to="/classes" className="back-button">
            ← Back to Classes
          </Link>
        </div>

        {/* =========================
            CLASS INFORMATION
        ========================= */}

        <div className="class-info-grid">
          <div className="class-info-card">
            <span>Grade</span>
            <strong>Grade {schoolClass.grade}</strong>
          </div>

          <div className="class-info-card">
            <span>Section</span>
            <strong>Section {schoolClass.section}</strong>
          </div>

          <div className="class-info-card">
            <span>Room</span>
            <strong>{schoolClass.room}</strong>
          </div>

          <div className="class-info-card">
            <span>Academic Year</span>
            <strong>{schoolClass.academicYear}</strong>
          </div>

          <div className="class-info-card">
            <span>Status</span>
            <strong
              className={
                schoolClass.status === "Active"
                  ? "status-active"
                  : "status-inactive"
              }
            >
              {schoolClass.status}
            </strong>
          </div>
        </div>

        {/* =========================
            TEACHERS
        ========================= */}

        <div className="class-section">
          <div className="section-header">
            <div>
              <h2>Assigned Teachers</h2>

              <p>Teachers assigned to this class</p>
            </div>

            <span className="teacher-count">
              {classTeachers.length} Teachers
            </span>
          </div>

          {classTeachers.length === 0 ? (
            <div className="empty-state">
              <p>No teachers assigned to this class.</p>
            </div>
          ) : (
            <div className="teachers-grid">
              {classTeachers.map((teacher) => (
                <div key={teacher.id} className="teacher-card">
                  <div className="teacher-avatar">
                    {teacher.name?.charAt(0)?.toUpperCase()}
                  </div>

                  <div className="teacher-info">
                    <h3>{teacher.name}</h3>

                    <p>{teacher.subject}</p>

                    <span>{teacher.email}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* =========================
            ACTIONS
        ========================= */}

        {(isAdmin || isAssignedTeacher) && (
          <div className="class-actions">
            <Link
              to={`/classes/${schoolClass.id}/edit`}
              className="edit-class-button"
            >
              Edit Class
            </Link>

            <button
              type="button"
              className="delete-class-button"
              onClick={handleDelete}
            >
              Delete Class
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassDetails;

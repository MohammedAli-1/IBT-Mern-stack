import { Link, useNavigate, useParams } from "react-router-dom";

import { useCourseStore } from "../../store/courseStore";
import { useTeacherStore } from "../../store/teacherStore";
import { useStudentStore } from "../../store/studentStore";
import { useAuthStore } from "../../store/authStore";

import "./CourseDetails.css";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // =========================
  // AUTH
  // =========================

  const user = useAuthStore(
    (state) => state.user
  );

  // =========================
  // COURSE STORE
  // =========================

  const course = useCourseStore(
    (state) =>
      state.courses.find(
        (item) => item.id === Number(id)
      )
  );

  const deleteCourse = useCourseStore(
    (state) => state.deleteCourse
  );

  // =========================
  // TEACHER STORE
  // =========================

  const teachers = useTeacherStore(
    (state) => state.teachers
  );

  // =========================
  // STUDENT STORE
  // =========================

  const students = useStudentStore(
    (state) => state.students
  );

  // =========================
  // COURSE NOT FOUND
  // =========================

  if (!course) {
    return (
      <div className="course-details-page">
        <div className="course-details-container">
          <h2>Course not found</h2>

          <Link to="/courses">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  // =========================
  // ROLE
  // =========================

  const isAdmin =
    user?.role === "admin";

  const isTeacher =
    user?.role === "teacher";

  const isStudent =
    user?.role === "student";

  // =========================
  // TEACHER ACCESS
  // =========================

  const isCourseOwner =
    Number(course.teacherId) ===
    Number(user?.teacherId);

  // =========================
  // CURRENT STUDENT
  // =========================

  const currentStudent = students.find(
    (student) =>
      Number(student.id) ===
      Number(user?.studentId)
  );

  // =========================
  // STUDENT ACCESS
  // =========================

  const isStudentCourse =
    Number(course.grade) ===
    Number(currentStudent?.grade);

  // =========================
  // TEACHER PROTECTION
  // =========================

  if (
    isTeacher &&
    !isCourseOwner
  ) {
    return (
      <div className="course-details-page">
        <div className="course-details-container">

          <h2>Access Denied</h2>

          <p>
            You can only view courses
            assigned to you.
          </p>

          <Link to="/courses">
            ← Back to My Courses
          </Link>

        </div>
      </div>
    );
  }

  // =========================
  // STUDENT PROTECTION
  // =========================

  if (
    isStudent &&
    !isStudentCourse
  ) {
    return (
      <div className="course-details-page">
        <div className="course-details-container">

          <h2>Access Denied</h2>

          <p>
            You can only view courses
            available for your grade.
          </p>

          <Link to="/courses">
            ← Back to My Courses
          </Link>

        </div>
      </div>
    );
  }

  // =========================
  // FIND TEACHER
  // =========================

  const teacher = teachers.find(
    (teacher) =>
      Number(teacher.id) ===
      Number(course.teacherId)
  );

  // =========================
  // DELETE
  // =========================

  const handleDelete = () => {
    if (!isAdmin && !isCourseOwner) {
      alert(
        "You are not allowed to delete this course."
      );

      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) {
      return;
    }

    deleteCourse(course.id);

    navigate("/courses");
  };

  // =========================
  // PAGE
  // =========================

  return (
    <div className="course-details-page">

      <div className="course-details-container">

        {/* HEADER */}

        <div className="course-details-header">

          <div>
            <h1>{course.name}</h1>

            <p>
              Course information and details
            </p>
          </div>

          <Link
            to="/courses"
            className="back-button"
          >
            ← Back to Courses
          </Link>

        </div>

        {/* COURSE INFORMATION */}

        <div className="course-info-grid">

          <div className="course-info-card">
            <span>Course Code</span>

            <strong>
              {course.code}
            </strong>
          </div>

          <div className="course-info-card">
            <span>Grade</span>

            <strong>
              Grade {course.grade}
            </strong>
          </div>

          <div className="course-info-card">
            <span>Credit Hours</span>

            <strong>
              {course.creditHours}
            </strong>
          </div>

          <div className="course-info-card">
            <span>Status</span>

            <strong
              className={
                course.status === "Active"
                  ? "status-active"
                  : "status-inactive"
              }
            >
              {course.status}
            </strong>
          </div>

        </div>

        {/* DESCRIPTION */}

        <div className="course-section">

          <h2>Description</h2>

          <p>
            {course.description ||
              "No description available."}
          </p>

        </div>

        {/* TEACHER */}

        <div className="course-section">

          <h2>Teacher</h2>

          {teacher ? (

            <div className="course-teacher-card">

              <div className="teacher-avatar">
                {teacher.name
                  ?.charAt(0)
                  ?.toUpperCase()}
              </div>

              <div>

                <h3>
                  {teacher.name}
                </h3>

                <p>
                  {teacher.subject}
                </p>

                <span>
                  {teacher.email}
                </span>

              </div>

            </div>

          ) : (

            <p>
              No teacher assigned.
            </p>

          )}

        </div>

        {/* ACTIONS */}

        {(isAdmin || isCourseOwner) && (
          <div className="course-actions">

            <Link
              to={`/courses/${course.id}/edit`}
              className="edit-course-button"
            >
              Edit Course
            </Link>

            <button
              type="button"
              className="delete-course-button"
              onClick={handleDelete}
            >
              Delete Course
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default CourseDetails;
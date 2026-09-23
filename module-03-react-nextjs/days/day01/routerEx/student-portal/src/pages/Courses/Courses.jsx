import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useCourseStore } from "../../store/courseStore";
import { useAuthStore } from "../../store/authStore";
import { useStudentStore } from "../../store/studentStore";

import "./Courses.css";

function Courses() {
  const user = useAuthStore((state) => state.user);

  const courses = useCourseStore((state) => state.courses);
  const loading = useCourseStore((state) => state.loading);
  const error = useCourseStore((state) => state.error);
  const fetchCourses = useCourseStore((state) => state.fetchCourses);
  const students = useStudentStore((state) => state.students);

  const fetchStudents = useStudentStore((state) => state.fetchStudents);
  useEffect(() => {
    if (courses.length === 0) {
      fetchCourses();
    }

    if (students.length === 0) {
      fetchStudents();
    }
  }, [courses.length, students.length, fetchCourses, fetchStudents]);

  // ADMIN → see all courses
  // TEACHER → see only courses assigned to that teacher
  const currentStudent = students.find(
    (student) => Number(student.id) === Number(user?.studentId),
  );

  const visibleCourses =
    user?.role === "admin"
      ? courses
      : user?.role === "teacher"
        ? courses.filter(
            (course) => Number(course.teacherId) === Number(user.teacherId),
          )
        : user?.role === "student"
          ? courses.filter(
              (course) =>
                Number(course.grade) === Number(currentStudent?.grade),
            )
          : [];
  console.log("CURRENT USER:", user);
  console.log("TEACHER ID:", user?.teacherId);
  console.log("ALL COURSES:", courses);
  console.log("VISIBLE COURSES:", visibleCourses);

  if (loading) {
    return (
      <div className="courses-page">
        <div className="empty-state">
          <h3>Loading courses...</h3>
          <p>Please wait.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="courses-page">
        <div className="empty-state">
          <h3>Failed to load courses</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <div className="page-header">
        <div>
          <h1>{user?.role === "teacher" ? "My Courses" : "Courses"}</h1>

          <p>
            {user?.role === "teacher"
              ? "Courses assigned to you"
              : "Manage school courses"}
          </p>
        </div>

        {user?.role === "admin" && (
          <Link to="/courses/add" className="add-button">
            + Add Course
          </Link>
        )}
      </div>

      <div className="courses-grid">
        {visibleCourses.map((course) => (
          <div className="course-card" key={course.id}>
            <h2>{course.name}</h2>

            <p>
              <strong>Code:</strong> {course.code}
            </p>

            <p>
              <strong>Grade:</strong> {course.grade}
            </p>

            <p>
              <strong>Credit Hours:</strong> {course.creditHours}
            </p>

            <p>
              <strong>Status:</strong> {course.status}
            </p>

            <Link to={`/courses/${course.id}`}>View Course</Link>
          </div>
        ))}
      </div>

      {visibleCourses.length === 0 && !loading && (
        <div className="empty-state">
          <h3>No courses found</h3>

          {user?.role === "teacher" ? (
            <p>You don't have any courses assigned to you.</p>
          ) : (
            <p>There are no courses available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Courses;

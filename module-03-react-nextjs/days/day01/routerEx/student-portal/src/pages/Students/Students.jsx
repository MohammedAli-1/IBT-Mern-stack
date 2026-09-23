import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { useStudentStore } from "../../store/studentStore";
import { useClassStore } from "../../store/classStore";
import { useAuthStore } from "../../store/authStore";

import "./Students.css";

function Students() {
  const user = useAuthStore((state) => state.user);

  const students = useStudentStore((state) => state.students);
  const studentLoading = useStudentStore((state) => state.loading);
  const fetchStudents = useStudentStore((state) => state.fetchStudents);

  const classes = useClassStore((state) => state.classes);
  const classLoading = useClassStore((state) => state.loading);
  const fetchClasses = useClassStore((state) => state.fetchClasses);

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }

    if (classes.length === 0) {
      fetchClasses();
    }
  }, [students.length, classes.length, fetchStudents, fetchClasses]);

  /*
    ==========================================
    1. FIND TEACHER'S CLASSES
    ==========================================
  */

  const myClasses = useMemo(() => {
    if (user?.role !== "teacher") {
      return [];
    }

    return classes.filter((schoolClass) =>
      schoolClass.teacherIds?.includes(user.teacherId),
    );
  }, [classes, user]);

  /*
    ==========================================
    2. GET CLASS IDs
    ==========================================
  */

  const myClassIds = useMemo(() => {
    return myClasses.map((schoolClass) => schoolClass.id);
  }, [myClasses]);

  /*
    ==========================================
    3. FIND STUDENTS IN MY CLASSES
    ==========================================
  */

  const visibleStudents = useMemo(() => {
    // ADMIN → sees every student
    if (user?.role === "admin") {
      return students;
    }

    // TEACHER → sees only students
    // belonging to teacher's classes
    if (user?.role === "teacher") {
      return students.filter((student) => myClassIds.includes(student.classId));
    }

    return [];
  }, [students, user, myClassIds]);

  if (studentLoading || classLoading) {
    return <p>Loading students...</p>;
  }

  return (
    <div className="students-page">
      <div className="page-header">
        <div>
          <h1>{user?.role === "teacher" ? "My Students" : "Students"}</h1>

          <p>
            {user?.role === "teacher"
              ? "Students in your assigned classes"
              : "Manage school students"}
          </p>
        </div>

        {user?.role === "admin" && (
          <Link to="/students/new" className="add-button">
            + Add Student
          </Link>
        )}
      </div>

      <div className="students-stats">
        <div>
          <strong>{visibleStudents.length}</strong>
          <span>
            {user?.role === "teacher" ? "My Students" : "Total Students"}
          </span>
        </div>
      </div>

      <div className="students-list">
        {visibleStudents.map((student) => (
          <div className="student-card" key={student.id}>
            <h3>{student.name}</h3>

            <p>
              Grade {student.grade}
              {" - "}
              Section {student.section}
            </p>

            <p>{student.email}</p>

            <Link to={`/students/${student.id}`}>View Student</Link>
          </div>
        ))}
      </div>

      {visibleStudents.length === 0 && (
        <div className="empty-state">
          <h3>No students found</h3>

          <p>No students are assigned to your classes.</p>
        </div>
      )}
    </div>
  );
}

export default Students;

import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useClassStore } from "../../store/classStore";
import { useAuthStore } from "../../store/authStore";
import { useStudentStore } from "../../store/studentStore";
import "./Classes.css";

function Classes() {
  const user = useAuthStore((state) => state.user);

  const classes = useClassStore((state) => state.classes);
  const loading = useClassStore((state) => state.loading);
  const error = useClassStore((state) => state.error);
  const fetchClasses = useClassStore((state) => state.fetchClasses);
  const students = useStudentStore((state) => state.students);

  const fetchStudents = useStudentStore((state) => state.fetchStudents);
  useEffect(() => {
    if (classes.length === 0) {
      fetchClasses();
    }

    if (students.length === 0) {
      fetchStudents();
    }
  }, [classes.length, students.length, fetchClasses, fetchStudents]);

  // ADMIN → all classes
  // TEACHER → only classes assigned to that teacher
  const currentStudent = students.find(
    (student) => Number(student.id) === Number(user?.studentId),
  );

  const visibleClasses =
    user?.role === "admin"
      ? classes
      : user?.role === "teacher"
        ? classes.filter((schoolClass) =>
            schoolClass.teacherIds?.includes(Number(user.teacherId)),
          )
        : user?.role === "student"
          ? classes.filter(
              (schoolClass) =>
                Number(schoolClass.id) === Number(currentStudent?.classId),
            )
          : [];

  if (loading) {
    return <p>Loading classes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="classes-page">
      <div className="page-header">
        <div>
          <h1>{user?.role === "teacher" ? "My Classes" : "Classes"}</h1>

          <p>
            {user?.role === "teacher"
              ? "Classes assigned to you"
              : "Manage school classes"}
          </p>
        </div>

        {user?.role === "admin" && (
          <Link to="/classes/add" className="add-button">
            + Add Class
          </Link>
        )}
      </div>

      <div className="classes-grid">
        {visibleClasses.map((schoolClass) => (
          <div className="class-card" key={schoolClass.id}>
            <h2>{schoolClass.name}</h2>

            <p>
              Grade {schoolClass.grade} - Section {schoolClass.section}
            </p>

            <p>Room: {schoolClass.room}</p>

            <p>Academic Year: {schoolClass.academicYear}</p>

            <Link to={`/classes/${schoolClass.id}`}>View Class</Link>
          </div>
        ))}
      </div>

      {visibleClasses.length === 0 && (
        <div className="empty-state">
          <h3>No classes found</h3>

          <p>You don't have any classes assigned to you.</p>
        </div>
      )}
    </div>
  );
}

export default Classes;

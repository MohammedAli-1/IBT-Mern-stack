import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";
import { useStudentStore } from "../../store/studentStore";
import { useTeacherStore } from "../../store/teacherStore";
import { useCourseStore } from "../../store/courseStore";
import { useClassStore } from "../../store/classStore";

import "./Dashboard.css";

function Dashboard() {
  // ================= AUTH =================

  const user = useAuthStore((state) => state.user);

  // ================= STUDENTS =================

  const students = useStudentStore((state) => state.students);

  const fetchStudents = useStudentStore((state) => state.fetchStudents);

  // ================= TEACHERS =================

  const teachers = useTeacherStore((state) => state.teachers);

  const fetchTeachers = useTeacherStore((state) => state.fetchTeachers);

  // ================= COURSES =================

  const courses = useCourseStore((state) => state.courses);

  const fetchCourses = useCourseStore((state) => state.fetchCourses);

  // ================= CLASSES =================

  const classes = useClassStore((state) => state.classes);

  const fetchClasses = useClassStore((state) => state.fetchClasses);

  // ================= LOAD DATA =================

  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }

    if (teachers.length === 0) {
      fetchTeachers();
    }

    if (courses.length === 0) {
      fetchCourses();
    }

    if (classes.length === 0) {
      fetchClasses();
    }
  }, [
    students.length,
    teachers.length,
    courses.length,
    classes.length,
    fetchStudents,
    fetchTeachers,
    fetchCourses,
    fetchClasses,
  ]);

  // =================================================
  // TEACHER DATA
  // =================================================

  const currentTeacher = teachers.find(
    (teacher) => Number(teacher.id) === Number(user?.teacherId),
  );

  const myClasses = classes.filter((schoolClass) =>
    schoolClass.teacherIds?.includes(Number(user?.teacherId)),
  );

  const myStudents = students.filter((student) =>
    myClasses.some((schoolClass) => schoolClass.id === student.classId),
  );

  const myCourses = courses.filter(
    (course) => Number(course.teacherId) === Number(user?.teacherId),
  );

  // =================================================
  // STUDENT DATA
  // =================================================

  const currentStudent = students.find(
    (student) => Number(student.id) === Number(user?.studentId),
  );

  const studentClass = classes.find(
    (schoolClass) => Number(schoolClass.id) === Number(currentStudent?.classId),
  );

  const studentTeachers = teachers.filter((teacher) =>
    studentClass?.teacherIds?.includes(Number(teacher.id)),
  );

  const studentCourses = courses.filter(
    (course) => Number(course.grade) === Number(currentStudent?.grade),
  );

  // =================================================
  // PAGE
  // =================================================

  return (
    <div className="dashboard-page">
      {/* ================= HEADER ================= */}

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>

          <p>
            Welcome back,{" "}
            {currentTeacher?.name || currentStudent?.name || user?.name}
          </p>
        </div>

        <div className="user-role">{user?.role}</div>
      </div>

      {/* =================================================
          ADMIN DASHBOARD
      ================================================= */}

      {user?.role === "admin" && (
        <>
          <div className="role-section">
            <h2>School Overview</h2>

            <p>
              Monitor your school's students, teachers, courses and classes.
            </p>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon">👨‍🎓</div>

              <div>
                <h3>{students.length}</h3>

                <p>Total Students</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">👨‍🏫</div>

              <div>
                <h3>{teachers.length}</h3>

                <p>Total Teachers</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📚</div>

              <div>
                <h3>{courses.length}</h3>

                <p>Total Courses</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🏫</div>

              <div>
                <h3>{classes.length}</h3>

                <p>Total Classes</p>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Quick Actions</h2>

              <p>Common school management tasks</p>
            </div>

            <div className="quick-actions">
              <Link to="/students/new" className="quick-action">
                <span>👨‍🎓</span>

                <strong>Add Student</strong>

                <small>Register a new student</small>
              </Link>

              <Link to="/teachers/add" className="quick-action">
                <span>👨‍🏫</span>

                <strong>Add Teacher</strong>

                <small>Register a new teacher</small>
              </Link>

              <Link to="/courses/add" className="quick-action">
                <span>📚</span>

                <strong>Add Course</strong>

                <small>Create a new course</small>
              </Link>

              <Link to="/classes/add" className="quick-action">
                <span>🏫</span>

                <strong>Add Class</strong>

                <small>Create a new class</small>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* =================================================
          TEACHER DASHBOARD
      ================================================= */}

      {user?.role === "teacher" && (
        <>
          <div className="role-section">
            <h2>Teacher Dashboard</h2>

            <p>
              Manage your classes, students, courses, attendance and grades.
            </p>
          </div>

          {/* STATS */}

          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon">🏫</div>

              <div>
                <h3>{myClasses.length}</h3>

                <p>My Classes</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">👨‍🎓</div>

              <div>
                <h3>{myStudents.length}</h3>

                <p>My Students</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📚</div>

              <div>
                <h3>{myCourses.length}</h3>

                <p>My Courses</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📈</div>

              <div>
                <h3>0</h3>

                <p>Pending Grades</p>
              </div>
            </div>
          </div>

          {/* MY CLASSES */}

          <div className="dashboard-section">
            <div className="section-header">
              <h2>My Classes</h2>

              <p>Classes assigned to you</p>
            </div>

            <div className="quick-actions">
              {myClasses.length > 0 ? (
                myClasses.map((schoolClass) => (
                  <Link
                    key={schoolClass.id}
                    to={`/classes/${schoolClass.id}`}
                    className="quick-action"
                  >
                    <span>🏫</span>

                    <strong>{schoolClass.name}</strong>

                    <small>
                      Grade {schoolClass.grade}
                      {" • "}
                      Section {schoolClass.section}
                    </small>
                  </Link>
                ))
              ) : (
                <div className="empty-state">No classes assigned yet.</div>
              )}
            </div>
          </div>

          {/* TEACHER ACTIONS */}

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Quick Actions</h2>

              <p>Common teaching tasks</p>
            </div>

            <div className="quick-actions">
              <Link to="/attendance" className="quick-action">
                <span>📝</span>

                <strong>Take Attendance</strong>

                <small>Record today's attendance</small>
              </Link>

              <Link to="/grades" className="quick-action">
                <span>📈</span>

                <strong>Enter Grades</strong>

                <small>Record student results</small>
              </Link>

              <Link to="/students" className="quick-action">
                <span>👨‍🎓</span>

                <strong>View Students</strong>

                <small>View your students</small>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* =================================================
          STUDENT DASHBOARD
      ================================================= */}

      {user?.role === "student" && (
        <>
          <div className="role-section">
            <h2>Student Dashboard</h2>

            <p>View your personal school information and academic progress.</p>
          </div>

          {/* STUDENT STATS */}

          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon">🎓</div>

              <div>
                <h3>{currentStudent?.grade || "-"}</h3>

                <p>My Grade</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🏫</div>

              <div>
                <h3>{studentClass ? studentClass.section : "-"}</h3>

                <p>My Class</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📚</div>

              <div>
                <h3>{studentCourses.length}</h3>

                <p>My Courses</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">👨‍🏫</div>

              <div>
                <h3>{studentTeachers.length}</h3>

                <p>My Teachers</p>
              </div>
            </div>
          </div>

          {/* MY INFORMATION */}

          <div className="dashboard-section">
            <div className="section-header">
              <h2>My Information</h2>

              <p>Your current school information</p>
            </div>

            <div className="quick-actions">
              <div className="quick-action">
                <span>👤</span>

                <strong>{currentStudent?.name || user?.name}</strong>

                <small>Student</small>
              </div>

              <div className="quick-action">
                <span>🏫</span>

                <strong>{studentClass?.name || "Class not found"}</strong>

                <small>Grade {currentStudent?.grade || "-"}</small>
              </div>

              <div className="quick-action">
                <span>📱</span>

                <strong>{currentStudent?.phone || "No phone"}</strong>

                <small>Phone</small>
              </div>
            </div>
          </div>

          {/* MY COURSES */}

          <div className="dashboard-section">
            <div className="section-header">
              <h2>My Courses</h2>

              <p>Courses available for your grade</p>
            </div>

            <div className="quick-actions">
              {studentCourses.length > 0 ? (
                studentCourses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.id}`}
                    className="quick-action"
                  >
                    <span>📚</span>

                    <strong>{course.name}</strong>

                    <small>
                      {course.code}
                      {" • "}
                      {course.creditHours}
                      {" credit hours"}
                    </small>
                  </Link>
                ))
              ) : (
                <div className="empty-state">No courses found.</div>
              )}
            </div>
          </div>

          {/* STUDENT ACTIONS */}

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Quick Actions</h2>

              <p>Access your school information</p>
            </div>

            <div className="quick-actions">
              <Link to="/courses" className="quick-action">
                <span>📚</span>

                <strong>My Courses</strong>

                <small>View your courses</small>
              </Link>

              <Link to="/classes" className="quick-action">
                <span>🏫</span>

                <strong>My Class</strong>

                <small>View your class</small>
              </Link>

              <Link to="/grades" className="quick-action">
                <span>📈</span>

                <strong>My Grades</strong>

                <small>View your results</small>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* =================================================
          PARENT DASHBOARD
      ================================================= */}

      {user?.role === "parent" && (
        <div className="role-section">
          <h2>Parent Dashboard</h2>

          <p>View your children's attendance, grades, timetable and fees.</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

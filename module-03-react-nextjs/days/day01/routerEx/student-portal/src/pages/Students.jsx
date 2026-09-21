import { useState } from "react";
import { Link } from "react-router-dom";

import { useStudents } from "../context/StudentContext.jsx";

import "./Students.css";

function Students() {
  // ================================
  // STATE
  // ================================

  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");
  const [status, setStatus] = useState("");
  const { students } = useStudents();

  // ================================
  // FILTER STUDENTS
  // ================================

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText);

    const matchesGrade = grade === "" || student.grade === Number(grade);

    const matchesStatus = status === "" || student.status === status;

    return matchesSearch && matchesGrade && matchesStatus;
  });

  // ================================
  // STATISTICS
  // ================================

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active",
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive",
  ).length;

  const grade12Students = students.filter(
    (student) => student.grade === 12,
  ).length;

  return (
    <div className="students-page">
      {/* ================================
          PAGE HEADER
      ================================= */}

      <div className="students-header">
        <div>
          <h1>Students</h1>

          <p>Manage and view all students in the school.</p>
        </div>

        <Link to="/students/new" className="add-student-btn">
          + Add Student
        </Link>
      </div>

      {/* ================================
          STATISTICS
      ================================= */}

      <div className="student-stats">
        <div className="student-stat-card">
          <span>Total Students</span>
          <strong>{totalStudents}</strong>
        </div>

        <div className="student-stat-card">
          <span>Active Students</span>
          <strong>{activeStudents}</strong>
        </div>

        <div className="student-stat-card">
          <span>Inactive Students</span>
          <strong>{inactiveStudents}</strong>
        </div>

        <div className="student-stat-card">
          <span>Grade 12</span>
          <strong>{grade12Students}</strong>
        </div>
      </div>

      {/* ================================
          STUDENTS CONTAINER
      ================================= */}

      <div className="students-container">
        {/* TABLE HEADER */}

        <div className="table-header">
          <div className="table-title">
            <h2>All Students</h2>

            <p>
              Showing {filteredStudents.length} of {students.length} students
            </p>
          </div>

          {/* ================================
              FILTERS
          ================================= */}

          <div className="student-filters">
            {/* SEARCH */}

            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {/* GRADE */}

            <select
              value={grade}
              onChange={(event) => setGrade(event.target.value)}
            >
              <option value="">All Grades</option>

              <option value="10">Grade 10</option>

              <option value="11">Grade 11</option>

              <option value="12">Grade 12</option>
            </select>

            {/* STATUS */}

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="">All Status</option>

              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* ================================
            TABLE
        ================================= */}

        <div className="table-wrapper">
          <table className="students-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Gender</th>
                <th>Grade</th>
                <th>Section</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  {/* STUDENT */}

                  <td>
                    <div className="student-info">
                      <div className="student-avatar">
                        {student.name.charAt(0)}
                      </div>

                      <div>
                        <strong>{student.name}</strong>

                        <span>{student.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* GENDER */}

                  <td>{student.gender}</td>

                  {/* GRADE */}

                  <td>Grade {student.grade}</td>

                  {/* SECTION */}

                  <td>{student.section}</td>

                  {/* PHONE */}

                  <td>{student.phone}</td>

                  {/* STATUS */}

                  <td>
                    <span
                      className={`status-badge ${student.status.toLowerCase()}`}
                    >
                      {student.status}
                    </span>
                  </td>

                  {/* ACTION */}

                  <td>
                    <Link to={`/students/${student.id}`} className="view-btn">
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {/* ================================
                  NO RESULTS
              ================================= */}

              {filteredStudents.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                    }}
                  >
                    <strong>No students found</strong>

                    <p>Try changing your search or filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Students;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTeacherStore } from "../../store/teacherStore";
import "./Teachers.css";

function Teachers() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");

  const teachers = useTeacherStore((state) => state.teachers);
  const fetchTeachers = useTeacherStore(
    (state) => state.fetchTeachers
  );
  const loading = useTeacherStore((state) => state.loading);
  const error = useTeacherStore((state) => state.error);

  // Load teachers from teachers.json
  useEffect(() => {
    if (teachers.length === 0) {
      fetchTeachers();
    }
  }, [teachers.length, fetchTeachers]);

  // Search and filter
  const filteredTeachers = teachers.filter((teacher) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      teacher.name.toLowerCase().includes(searchText) ||
      teacher.email.toLowerCase().includes(searchText);

    const matchesSubject =
      subject === "" || teacher.subject === subject;

    const matchesStatus =
      status === "" || teacher.status === status;

    return matchesSearch && matchesSubject && matchesStatus;
  });

  // Statistics
  const totalTeachers = teachers.length;

  const activeTeachers = teachers.filter(
    (teacher) => teacher.status === "Active"
  ).length;

  const inactiveTeachers = teachers.filter(
    (teacher) => teacher.status === "Inactive"
  ).length;

  if (loading) {
    return <p>Loading teachers...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="teachers-page">

      {/* Header */}
      <div className="teachers-header">
        <div>
          <h1>Teachers</h1>
          <p>Manage school teachers</p>
        </div>

        <Link to="/teachers/add" className="add-teacher-btn">
          + Add Teacher
        </Link>
      </div>

      {/* Statistics */}
      <div className="teacher-stats">

        <div className="stat-card">
          <h3>Total Teachers</h3>
          <p>{totalTeachers}</p>
        </div>

        <div className="stat-card">
          <h3>Active</h3>
          <p>{activeTeachers}</p>
        </div>

        <div className="stat-card">
          <h3>Inactive</h3>
          <p>{inactiveTeachers}</p>
        </div>

      </div>

      {/* Filters */}
      <div className="teacher-filters">

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
          <option value="English">English</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

      </div>

      {/* Teacher Table */}
      <div className="teachers-table-container">

        <table className="teachers-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <tr key={teacher.id}>

                  <td>{teacher.name}</td>

                  <td>{teacher.email}</td>

                  <td>{teacher.subject}</td>

                  <td>{teacher.experience} years</td>

                  <td>
                    <span
                      className={`status ${teacher.status.toLowerCase()}`}
                    >
                      {teacher.status}
                    </span>
                  </td>

                  <td className="teacher-actions">

                    <Link to={`/teachers/${teacher.id}`}>
                      View
                    </Link>

                    <Link to={`/teachers/${teacher.id}/edit`}>
                      Edit
                    </Link>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  No teachers found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Teachers;
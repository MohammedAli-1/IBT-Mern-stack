import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useClassStore } from "../../store/classStore";
import { useTeacherStore } from "../../store/teacherStore";
import { useAuthStore } from "../../store/authStore";

import "./ClassForm.css";

function EditClass() {
  const { id } = useParams();

  const schoolClass = useClassStore((state) =>
    state.classes.find((item) => item.id === Number(id)),
  );

  if (!schoolClass) {
    return (
      <div className="class-form-page">
        <div className="class-form-container">
          <h2>Class not found</h2>

          <Link to="/classes">← Back to Classes</Link>
        </div>
      </div>
    );
  }

  return <EditClassForm schoolClass={schoolClass} />;
}

function EditClassForm({ schoolClass }) {
  const navigate = useNavigate();

  // =========================
  // AUTH
  // =========================

  const user = useAuthStore((state) => state.user);

  // =========================
  // CLASS STORE
  // =========================

  const updateClass = useClassStore((state) => state.updateClass);

  // =========================
  // TEACHER STORE
  // =========================

  const teachers = useTeacherStore((state) => state.teachers);

  // =========================
  // ROLE
  // =========================

  const isAdmin = user?.role === "admin";

  const isTeacher = user?.role === "teacher";

  // =========================
  // TEACHER ACCESS
  // =========================

  const isAssignedTeacher = schoolClass.teacherIds?.includes(
    Number(user?.teacherId),
  );

  // =========================
  // FORM STATE
  // =========================

  const [formData, setFormData] = useState({
    name: schoolClass.name,
    grade: schoolClass.grade,
    section: schoolClass.section,
    teacherIds: schoolClass.teacherIds || [],
    room: schoolClass.room,
    academicYear: schoolClass.academicYear,
    status: schoolClass.status,
  });

  const [error, setError] = useState("");

  // =========================
  // ACCESS DENIED
  // =========================

  if (isTeacher && !isAssignedTeacher) {
    return (
      <div className="class-form-page">
        <div className="class-form-container">
          <h2>Access Denied</h2>

          <p>You can only edit classes assigned to you.</p>

          <Link to="/classes">← Back to My Classes</Link>
        </div>
      </div>
    );
  }

  // =========================
  // NORMAL INPUTS
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // TEACHER CHECKBOXES
  // =========================

  const handleTeacherChange = (e) => {
    const teacherId = Number(e.target.value);

    setFormData((prev) => {
      const alreadySelected = prev.teacherIds.includes(teacherId);

      return {
        ...prev,

        teacherIds: alreadySelected
          ? prev.teacherIds.filter((id) => id !== teacherId)
          : [...prev.teacherIds, teacherId],
      };
    });
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extra authorization check
    if (isTeacher && !isAssignedTeacher) {
      setError("You are not allowed to edit this class.");

      return;
    }

    if (
      !formData.name ||
      !formData.grade ||
      !formData.section ||
      !formData.room ||
      !formData.academicYear
    ) {
      setError("Please fill in all required fields.");

      return;
    }

    if (formData.teacherIds.length === 0) {
      setError("Please select at least one teacher.");

      return;
    }

    updateClass(schoolClass.id, {
      ...formData,

      grade: Number(formData.grade),

      teacherIds: formData.teacherIds.map(Number),
    });

    alert("Class updated successfully!");

    navigate(`/classes/${schoolClass.id}`);
  };

  return (
    <div className="class-form-page">
      <div className="class-form-container">
        <h1>Edit Class</h1>

        <p className="form-description">Update class information</p>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Class Name */}

          <div className="form-group">
            <label>Class Name *</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Grade */}

          <div className="form-group">
            <label>Grade *</label>

            <select name="grade" value={formData.grade} onChange={handleChange}>
              <option value="">Select Grade</option>

              <option value="10">Grade 10</option>

              <option value="11">Grade 11</option>

              <option value="12">Grade 12</option>
            </select>
          </div>

          {/* Section */}

          <div className="form-group">
            <label>Section *</label>

            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
            >
              <option value="">Select Section</option>

              <option value="A">Section A</option>

              <option value="B">Section B</option>

              <option value="C">Section C</option>
            </select>
          </div>

          {/* Teachers */}

          <div className="form-group">
            <label>Teachers *</label>

            <div className="teacher-selection">
              {teachers.map((teacher) => (
                <label key={teacher.id} className="teacher-checkbox">
                  <input
                    type="checkbox"
                    value={teacher.id}
                    checked={formData.teacherIds.includes(Number(teacher.id))}
                    onChange={handleTeacherChange}
                  />

                  <span>{teacher.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Room */}

          <div className="form-group">
            <label>Room *</label>

            <input
              type="text"
              name="room"
              value={formData.room}
              onChange={handleChange}
            />
          </div>

          {/* Academic Year */}

          <div className="form-group">
            <label>Academic Year *</label>

            <input
              type="text"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
            />
          </div>

          {/* Status */}

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Buttons */}

          <div className="form-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(`/classes/${schoolClass.id}`)}
            >
              Cancel
            </button>

            <button type="submit" className="submit-btn">
              Update Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditClass;

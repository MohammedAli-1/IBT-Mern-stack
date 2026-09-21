import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useStudents } from "../context/StudentContext";

import "./AddStudent.css";

function EditStudent() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { students, updateStudent } = useStudents();

  // =========================================
  // FIND STUDENT
  // =========================================

  const student = students.find((student) => student.id === Number(id));

  // =========================================
  // HANDLE INVALID ID
  // =========================================

  if (!student) {
    return (
      <div className="student-not-found">
        <h1>Student Not Found</h1>

        <button className="save-btn" onClick={() => navigate("/students")}>
          Back to Students
        </button>
      </div>
    );
  }

  // =========================================
  // FORM STATE
  // =========================================

  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    gender: student.gender,
    grade: String(student.grade),
    section: student.section,
    phone: student.phone,
    status: student.status,
  });

  // =========================================
  // ERRORS
  // =========================================

  const [errors, setErrors] = useState({});

  // =========================================
  // HANDLE CHANGE
  // =========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  // =========================================
  // VALIDATION
  // =========================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Student name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender.";
    }

    if (!formData.grade) {
      newErrors.grade = "Please select grade.";
    }

    if (!formData.section.trim()) {
      newErrors.section = "Section is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    return newErrors;
  };

  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }

    updateStudent(student.id, formData);

    navigate(`/students/${student.id}`);
  };

  return (
    <div className="add-student-page">
      <div className="add-student-header">
        <div>
          <h1>Edit Student</h1>

          <p>Update {student.name}'s information.</p>
        </div>
      </div>

      <div className="student-form-container">
        <form onSubmit={handleSubmit}>
          {/* =================================
              PERSONAL INFORMATION
          ================================= */}

          <div className="form-section">
            <div className="form-section-title">
              <h2>Personal Information</h2>

              <p>Update the student's basic information.</p>
            </div>

            <div className="form-grid">
              {/* NAME */}

              <div className="form-group">
                <label htmlFor="name">Full Name</label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />

                {errors.name && (
                  <small className="form-error">{errors.name}</small>
                )}
              </div>

              {/* EMAIL */}

              <div className="form-group">
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                {errors.email && (
                  <small className="form-error">{errors.email}</small>
                )}
              </div>

              {/* GENDER */}

              <div className="form-group">
                <label htmlFor="gender">Gender</label>

                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>

                  <option value="Male">Male</option>

                  <option value="Female">Female</option>
                </select>

                {errors.gender && (
                  <small className="form-error">{errors.gender}</small>
                )}
              </div>

              {/* PHONE */}

              <div className="form-group">
                <label htmlFor="phone">Phone</label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />

                {errors.phone && (
                  <small className="form-error">{errors.phone}</small>
                )}
              </div>
            </div>
          </div>

          {/* =================================
              SCHOOL INFORMATION
          ================================= */}

          <div className="form-section">
            <div className="form-section-title">
              <h2>School Information</h2>

              <p>Update enrollment information.</p>
            </div>

            <div className="form-grid">
              {/* GRADE */}

              <div className="form-group">
                <label htmlFor="grade">Grade</label>

                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                >
                  <option value="">Select grade</option>

                  <option value="10">Grade 10</option>

                  <option value="11">Grade 11</option>

                  <option value="12">Grade 12</option>
                </select>

                {errors.grade && (
                  <small className="form-error">{errors.grade}</small>
                )}
              </div>

              {/* SECTION */}

              <div className="form-group">
                <label htmlFor="section">Section</label>

                <input
                  id="section"
                  name="section"
                  type="text"
                  value={formData.section}
                  onChange={handleChange}
                />

                {errors.section && (
                  <small className="form-error">{errors.section}</small>
                )}
              </div>

              {/* STATUS */}

              <div className="form-group">
                <label htmlFor="status">Status</label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>

                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* =================================
              ACTIONS
          ================================= */}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(`/students/${student.id}`)}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;

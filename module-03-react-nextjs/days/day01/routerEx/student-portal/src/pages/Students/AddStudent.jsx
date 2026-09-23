import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentStore } from "../../store/studentStore"; 
import "./AddStudent.css";

function AddStudent() {
  const navigate = useNavigate();
  const addStudent = useStudentStore(
  (state) => state.addStudent
);
  // =================================
  // FORM STATE
  // =================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    grade: "",
    section: "",
    phone: "",
    status: "Active",
  });

  // =================================
  // ERROR STATE
  // =================================

  const [errors, setErrors] = useState({});

  // =================================
  // HANDLE INPUT CHANGE
  // =================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Remove error when user starts fixing it
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  // =================================
  // VALIDATION
  // =================================

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

  // =================================
  // SUBMIT FORM
  // =================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addStudent(formData);


    alert("Student added successfully!");

    navigate("/students");
  };

  // =================================
  // CANCEL
  // =================================

  const handleCancel = () => {
    navigate("/students");
  };

  return (
    <div className="add-student-page">
      {/* =================================
          PAGE HEADER
      ================================= */}

      <div className="add-student-header">
        <div>
          <h1>Add New Student</h1>

          <p>Enter the student's information below.</p>
        </div>
      </div>

      {/* =================================
          FORM
      ================================= */}

      <div className="student-form-container">
        <form onSubmit={handleSubmit}>
          {/* ===============================
              PERSONAL INFORMATION
          ================================ */}

          <div className="form-section">
            <div className="form-section-title">
              <h2>Personal Information</h2>

              <p>Basic information about the student.</p>
            </div>

            <div className="form-grid">
              {/* NAME */}

              <div className="form-group">
                <label htmlFor="name">Full Name</label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter student name"
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
                  placeholder="student@example.com"
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
                  placeholder="09xxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                />

                {errors.phone && (
                  <small className="form-error">{errors.phone}</small>
                )}
              </div>
            </div>
          </div>

          {/* ===============================
              SCHOOL INFORMATION
          ================================ */}

          <div className="form-section">
            <div className="form-section-title">
              <h2>School Information</h2>

              <p>Student's current enrollment information.</p>
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
                  placeholder="Example: A"
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

          {/* ===============================
              FORM ACTIONS
          ================================ */}

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;

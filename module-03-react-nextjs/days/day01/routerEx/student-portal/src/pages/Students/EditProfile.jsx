import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";
import { useStudentStore } from "../../store/studentStore";

import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const students = useStudentStore((state) => state.students);

  const updateStudent = useStudentStore((state) => state.updateStudent);

  const currentStudent = students.find(
    (student) => Number(student.id) === Number(user?.studentId),
  );

  if (!currentStudent) {
    return (
      <div className="edit-profile-page">
        <div className="edit-profile-container">
          <h2>Student profile not found</h2>

          <Link to="/profile">← Back to Profile</Link>
        </div>
      </div>
    );
  }

  return (
    <EditStudentProfileForm
      student={currentStudent}
      updateStudent={updateStudent}
      navigate={navigate}
    />
  );
}

function EditStudentProfileForm({ student, updateStudent, navigate }) {
  const [formData, setFormData] = useState({
    name: student.name || "",
    email: student.email || "",
    phone: student.phone || "",
    gender: student.gender || "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.gender
    ) {
      setError("Please fill in all required fields.");

      return;
    }

    updateStudent(student.id, {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      gender: formData.gender,
    });

    alert("Profile updated successfully!");

    navigate("/profile");
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        {/* HEADER */}

        <div className="edit-profile-header">
          <div>
            <h1>Edit Profile</h1>

            <p>Update your personal information.</p>
          </div>

          <Link to="/profile" className="edit-profile-back">
            ← Back to Profile
          </Link>
        </div>

        {/* FORM */}

        <div className="edit-profile-card">
          {error && <div className="edit-profile-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* NAME */}

            <div className="edit-form-group">
              <label htmlFor="name">Full Name *</label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            {/* EMAIL */}

            <div className="edit-form-group">
              <label htmlFor="email">Email *</label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            {/* PHONE */}

            <div className="edit-form-group">
              <label htmlFor="phone">Phone *</label>

              <input
                id="phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            {/* GENDER */}

            <div className="edit-form-group">
              <label htmlFor="gender">Gender *</label>

              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>
              </select>
            </div>

            {/* READ ONLY INFORMATION */}

            <div className="readonly-section">
              <h3>Academic Information</h3>

              <div className="readonly-grid">
                <div>
                  <span>Grade</span>
                  <strong>Grade {student.grade}</strong>
                </div>

                <div>
                  <span>Section</span>
                  <strong>Section {student.section}</strong>
                </div>

                <div>
                  <span>Class ID</span>
                  <strong>{student.classId}</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>{student.status}</strong>
                </div>
              </div>

              <p className="readonly-note">
                Academic information can only be changed by the school
                administrator.
              </p>
            </div>

            {/* BUTTONS */}

            <div className="edit-form-actions">
              <Link to="/profile" className="cancel-profile-button">
                Cancel
              </Link>

              <button type="submit" className="save-profile-button">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

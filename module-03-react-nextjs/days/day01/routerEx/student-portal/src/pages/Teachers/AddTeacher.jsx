import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTeacherStore } from "../../store/teacherStore";
import "./TeacherForm.css";

function AddTeacher() {
  const navigate = useNavigate();

  const addTeacher = useTeacherStore(
    (state) => state.addTeacher
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    subject: "",
    qualification: "",
    experience: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Teacher name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.subject) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification =
        "Qualification is required";
    }

    if (
      formData.experience === "" ||
      Number(formData.experience) < 0
    ) {
      newErrors.experience =
        "Enter a valid experience";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    addTeacher(formData);

    alert("Teacher added successfully!");

    navigate("/teachers");
  };

  return (
    <div className="teacher-form-page">

      <div className="teacher-form-header">
        <div>
          <h1>Add Teacher</h1>
          <p>Add a new teacher to the school</p>
        </div>
      </div>

      <form
        className="teacher-form"
        onSubmit={handleSubmit}
      >

        {/* Name */}

        <div className="form-group">
          <label>Full Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter teacher name"
          />

          {errors.name && (
            <p className="form-error">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="teacher@example.com"
          />

          {errors.email && (
            <p className="form-error">
              {errors.email}
            </p>
          )}
        </div>

        {/* Gender */}

        <div className="form-group">
          <label>Gender</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {errors.gender && (
            <p className="form-error">
              {errors.gender}
            </p>
          )}
        </div>

        {/* Phone */}

        <div className="form-group">
          <label>Phone</label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0911223344"
          />

          {errors.phone && (
            <p className="form-error">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Subject */}

        <div className="form-group">
          <label>Subject</label>

          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          >
            <option value="">Select subject</option>
            <option value="Mathematics">
              Mathematics
            </option>
            <option value="English">
              English
            </option>
            <option value="Physics">
              Physics
            </option>
            <option value="Chemistry">
              Chemistry
            </option>
            <option value="Biology">
              Biology
            </option>
          </select>

          {errors.subject && (
            <p className="form-error">
              {errors.subject}
            </p>
          )}
        </div>

        {/* Qualification */}

        <div className="form-group">
          <label>Qualification</label>

          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            placeholder="e.g. BSc Mathematics"
          />

          {errors.qualification && (
            <p className="form-error">
              {errors.qualification}
            </p>
          )}
        </div>

        {/* Experience */}

        <div className="form-group">
          <label>Experience (Years)</label>

          <input
            type="number"
            name="experience"
            min="0"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g. 5"
          />

          {errors.experience && (
            <p className="form-error">
              {errors.experience}
            </p>
          )}
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

          {errors.status && (
            <p className="form-error">
              {errors.status}
            </p>
          )}
        </div>

        {/* Buttons */}

        <div className="form-actions">

          <button
            type="button"
            onClick={() => navigate("/teachers")}
            className="cancel-btn"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-btn"
          >
            Add Teacher
          </button>

        </div>

      </form>
    </div>
  );
}

export default AddTeacher;
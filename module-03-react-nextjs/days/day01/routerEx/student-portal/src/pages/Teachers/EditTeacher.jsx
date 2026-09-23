import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTeacherStore } from "../../store/teacherStore";
import "./TeacherForm.css";

function EditTeacher() {
  const { id } = useParams();

  const teacher = useTeacherStore((state) =>
    state.teachers.find((teacher) => teacher.id === Number(id)),
  );

  if (!teacher) {
    return (
      <div className="teacher-form-page">
        <h2>Teacher Not Found</h2>
        <p>The teacher you want to edit does not exist.</p>

        <Link to="/teachers">← Back to Teachers</Link>
      </div>
    );
  }

  return <EditTeacherForm teacher={teacher} />;
}

function EditTeacherForm({ teacher }) {
  const navigate = useNavigate();

  const updateTeacher = useTeacherStore((state) => state.updateTeacher);

  const [formData, setFormData] = useState({
    name: teacher.name,
    email: teacher.email,
    gender: teacher.gender,
    phone: teacher.phone,
    subject: teacher.subject,
    qualification: teacher.qualification,
    experience: teacher.experience,
    status: teacher.status,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = "Qualification is required";
    }

    if (formData.experience === "") {
      newErrors.experience = "Experience is required";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    updateTeacher(teacher.id, formData);

    alert("Teacher updated successfully!");

    navigate(`/teachers/${teacher.id}`);
  };

  return (
    <div className="teacher-form-page">
      <div className="teacher-form-header">
        <div>
          <h1>Edit Teacher</h1>
          <p>Update teacher information</p>
        </div>

        <Link to={`/teachers/${teacher.id}`}>← Back to Details</Link>
      </div>

      <form className="teacher-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label>Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender</label>

          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone</label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        {/* Subject */}
        <div className="form-group">
          <label>Subject</label>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />

          {errors.subject && <span className="error">{errors.subject}</span>}
        </div>

        {/* Qualification */}
        <div className="form-group">
          <label>Qualification</label>

          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
          />

          {errors.qualification && (
            <span className="error">{errors.qualification}</span>
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
          />

          {errors.experience && (
            <span className="error">{errors.experience}</span>
          )}
        </div>

        {/* Status */}
        <div className="form-group">
          <label>Status</label>

          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {errors.status && <span className="error">{errors.status}</span>}
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <Link to={`/teachers/${teacher.id}`} className="cancel-btn">
            Cancel
          </Link>

          <button type="submit" className="submit-btn">
            Update Teacher
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTeacher;

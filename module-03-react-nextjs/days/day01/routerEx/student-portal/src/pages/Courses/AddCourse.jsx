import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCourseStore } from "../../store/courseStore";
import "./CourseForm.css";

function AddCourse() {
  const navigate = useNavigate();

  const addCourse = useCourseStore(
    (state) => state.addCourse
  );

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    grade: "",
    teacher: "",
    creditHours: "",
    status: "Active",
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
      newErrors.name = "Course name is required";
    }

    if (!formData.code.trim()) {
      newErrors.code = "Course code is required";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Description is required";
    }

    if (!formData.grade) {
      newErrors.grade = "Grade is required";
    }

    if (!formData.teacher.trim()) {
      newErrors.teacher = "Teacher is required";
    }

    if (!formData.creditHours) {
      newErrors.creditHours =
        "Credit hours are required";
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

    addCourse(formData);

    alert("Course added successfully!");

    navigate("/courses");
  };

  return (
    <div className="course-form-page">

      <div className="course-form-header">
        <div>
          <h1>Add Course</h1>
          <p>Create a new school course</p>
        </div>

        <Link to="/courses">
          ← Back to Courses
        </Link>
      </div>

      <form
        className="course-form"
        onSubmit={handleSubmit}
      >

        {/* Course Name */}

        <div className="form-group">
          <label>Course Name</label>

          <input
            type="text"
            name="name"
            placeholder="e.g. Mathematics"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && (
            <span className="error">
              {errors.name}
            </span>
          )}
        </div>

        {/* Course Code */}

        <div className="form-group">
          <label>Course Code</label>

          <input
            type="text"
            name="code"
            placeholder="e.g. MATH10"
            value={formData.code}
            onChange={handleChange}
          />

          {errors.code && (
            <span className="error">
              {errors.code}
            </span>
          )}
        </div>

        {/* Grade */}

        <div className="form-group">
          <label>Grade</label>

          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
          >
            <option value="">Select Grade</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>

          {errors.grade && (
            <span className="error">
              {errors.grade}
            </span>
          )}
        </div>

        {/* Teacher */}

        <div className="form-group">
          <label>Teacher</label>

          <input
            type="text"
            name="teacher"
            placeholder="e.g. Ahmed Hassan"
            value={formData.teacher}
            onChange={handleChange}
          />

          {errors.teacher && (
            <span className="error">
              {errors.teacher}
            </span>
          )}
        </div>

        {/* Credit Hours */}

        <div className="form-group">
          <label>Credit Hours</label>

          <input
            type="number"
            name="creditHours"
            min="1"
            max="10"
            placeholder="e.g. 5"
            value={formData.creditHours}
            onChange={handleChange}
          />

          {errors.creditHours && (
            <span className="error">
              {errors.creditHours}
            </span>
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
            <span className="error">
              {errors.status}
            </span>
          )}
        </div>

        {/* Description */}

        <div className="form-group full-width">
          <label>Description</label>

          <textarea
            name="description"
            rows="5"
            placeholder="Describe the course..."
            value={formData.description}
            onChange={handleChange}
          />

          {errors.description && (
            <span className="error">
              {errors.description}
            </span>
          )}
        </div>

        {/* Buttons */}

        <div className="form-actions">

          <Link
            to="/courses"
            className="cancel-btn"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="submit-btn"
          >
            Add Course
          </button>

        </div>

      </form>
    </div>
  );
}

export default AddCourse;
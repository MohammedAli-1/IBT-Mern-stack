import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useCourseStore } from "../../store/courseStore";
import { useTeacherStore } from "../../store/teacherStore";
import { useAuthStore } from "../../store/authStore";

import "./CourseForm.css";

function EditCourse() {
  const { id } = useParams();

  const course = useCourseStore((state) =>
    state.courses.find((course) => course.id === Number(id)),
  );

  if (!course) {
    return (
      <div className="course-form-page">
        <h2>Course Not Found</h2>

        <p>The course you want to edit does not exist.</p>

        <Link to="/courses">← Back to Courses</Link>
      </div>
    );
  }

  return <EditCourseForm course={course} />;
}

function EditCourseForm({ course }) {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const updateCourse = useCourseStore((state) => state.updateCourse);

  const teachers = useTeacherStore((state) => state.teachers);

  const fetchTeachers = useTeacherStore((state) => state.fetchTeachers);

  useEffect(() => {
    if (teachers.length === 0) {
      fetchTeachers();
    }
  }, [teachers.length, fetchTeachers]);

  const [formData, setFormData] = useState({
    name: course.name,
    code: course.code,
    description: course.description,
    grade: course.grade,
    teacherId: course.teacherId,
    creditHours: course.creditHours,
    status: course.status,
  });

  const [errors, setErrors] = useState({});

  /*
    Check whether the logged-in teacher owns this course.
  */
  const isTeacher = user?.role === "teacher";

  const isCourseOwner = Number(course.teacherId) === Number(user?.teacherId);

  /*
    Teacher should not be able to edit
    another teacher's course.
  */
  if (isTeacher && !isCourseOwner) {
    return (
      <div className="course-form-page">
        <h2>Access Denied</h2>

        <p>You can only edit courses assigned to you.</p>

        <Link to="/courses">← Back to Courses</Link>
      </div>
    );
  }

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
      newErrors.description = "Description is required";
    }

    if (!formData.grade) {
      newErrors.grade = "Grade is required";
    }

    if (!formData.teacherId) {
      newErrors.teacherId = "Teacher is required";
    }

    if (!formData.creditHours) {
      newErrors.creditHours = "Credit hours are required";
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

    updateCourse(course.id, {
      ...formData,

      grade: Number(formData.grade),

      creditHours: Number(formData.creditHours),

      teacherId: Number(formData.teacherId),
    });

    alert("Course updated successfully!");

    navigate(`/courses/${course.id}`);
  };

  return (
    <div className="course-form-page">
      {/* Header */}
      <div className="course-form-header">
        <div>
          <h1>Edit Course</h1>

          <p>Update course information</p>
        </div>

        <Link to={`/courses/${course.id}`}>← Back to Details</Link>
      </div>

      {/* Form */}
      <form className="course-form" onSubmit={handleSubmit}>
        {/* Course Name */}
        <div className="form-group">
          <label>Course Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        {/* Course Code */}
        <div className="form-group">
          <label>Course Code</label>

          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
          />

          {errors.code && <span className="error">{errors.code}</span>}
        </div>

        {/* Grade */}
        <div className="form-group">
          <label>Grade</label>

          <select name="grade" value={formData.grade} onChange={handleChange}>
            <option value="">Select Grade</option>

            <option value="10">Grade 10</option>

            <option value="11">Grade 11</option>

            <option value="12">Grade 12</option>
          </select>

          {errors.grade && <span className="error">{errors.grade}</span>}
        </div>

        {/* Teacher */}
        <div className="form-group">
          <label>Teacher</label>

          <select
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            disabled={isTeacher}
          >
            <option value="">Select Teacher</option>

            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>

          {errors.teacherId && (
            <span className="error">{errors.teacherId}</span>
          )}

          {isTeacher && <small>You can only edit your own course.</small>}
        </div>

        {/* Credit Hours */}
        <div className="form-group">
          <label>Credit Hours</label>

          <input
            type="number"
            name="creditHours"
            min="1"
            max="10"
            value={formData.creditHours}
            onChange={handleChange}
          />

          {errors.creditHours && (
            <span className="error">{errors.creditHours}</span>
          )}
        </div>

        {/* Status */}
        <div className="form-group">
          <label>Status</label>

          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Active">Active</option>

            <option value="Inactive">Inactive</option>
          </select>

          {errors.status && <span className="error">{errors.status}</span>}
        </div>

        {/* Description */}
        <div className="form-group full-width">
          <label>Description</label>

          <textarea
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
          />

          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>

        {/* Actions */}
        <div className="form-actions">
          <Link to={`/courses/${course.id}`} className="cancel-btn">
            Cancel
          </Link>

          <button type="submit" className="submit-btn">
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCourse;

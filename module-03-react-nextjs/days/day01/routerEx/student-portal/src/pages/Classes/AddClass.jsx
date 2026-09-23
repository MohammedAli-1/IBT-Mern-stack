import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClassStore } from "../../store/classStore";
import { useTeacherStore } from "../../store/teacherStore";
import "./ClassForm.css";

function AddClass() {
  const navigate = useNavigate();

  const addClass = useClassStore((state) => state.addClass);

  const teachers = useTeacherStore((state) => state.teachers);
  const fetchTeachers = useTeacherStore(
    (state) => state.fetchTeachers
  );

  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    section: "",
    teacherIds: [],
    room: "",
    academicYear: "2026/2027",
    status: "Active",
  });

  const [error, setError] = useState("");

  // Load teachers
  useEffect(() => {
    if (teachers.length === 0) {
      fetchTeachers();
    }
  }, [teachers.length, fetchTeachers]);

  // Handle normal inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle teacher selection
  const handleTeacherChange = (e) => {
    const teacherId = Number(e.target.value);

    setFormData((prev) => {
      const alreadySelected =
        prev.teacherIds.includes(teacherId);

      return {
        ...prev,
        teacherIds: alreadySelected
          ? prev.teacherIds.filter(
              (id) => id !== teacherId
            )
          : [...prev.teacherIds, teacherId],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    addClass(formData);

    alert("Class added successfully!");

    navigate("/classes");
  };

  return (
    <div className="class-form-page">

      <div className="class-form-container">

        <h1>Add Class</h1>

        <p className="form-description">
          Create a new school class
        </p>

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          {/* Class Name */}
          <div className="form-group">
            <label>Class Name *</label>

            <input
              type="text"
              name="name"
              placeholder="Grade 10 - Section A"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Grade */}
          <div className="form-group">
            <label>Grade *</label>

            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
            >
              <option value="">
                Select Grade
              </option>

              <option value="10">
                Grade 10
              </option>

              <option value="11">
                Grade 11
              </option>

              <option value="12">
                Grade 12
              </option>
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
              <option value="">
                Select Section
              </option>

              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>

          {/* Teachers */}
          <div className="form-group">

            <label>
              Teachers *
            </label>

            <div className="teacher-selection">

              {teachers.length > 0 ? (

                teachers.map((teacher) => (

                  <label
                    key={teacher.id}
                    className="teacher-checkbox"
                  >

                    <input
                      type="checkbox"
                      value={teacher.id}
                      checked={formData.teacherIds.includes(
                        teacher.id
                      )}
                      onChange={handleTeacherChange}
                    />

                    <span>
                      {teacher.name}
                    </span>

                  </label>

                ))

              ) : (

                <p>Loading teachers...</p>

              )}

            </div>

          </div>

          {/* Room */}
          <div className="form-group">
            <label>Room *</label>

            <input
              type="text"
              name="room"
              placeholder="Room 101"
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
              placeholder="2026/2027"
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
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>

          {/* Buttons */}
          <div className="form-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/classes")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
            >
              Add Class
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddClass;
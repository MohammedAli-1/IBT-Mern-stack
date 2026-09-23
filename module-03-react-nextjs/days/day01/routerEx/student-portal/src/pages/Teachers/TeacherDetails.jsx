import { Link, useNavigate, useParams } from "react-router-dom";
import { useTeacherStore } from "../../store/teacherStore";
import "./TeacherDetails.css";

function TeacherDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const teachers = useTeacherStore((state) => state.teachers);
  const deleteTeacher = useTeacherStore(
    (state) => state.deleteTeacher
  );

  const teacher = teachers.find(
    (teacher) => teacher.id === Number(id)
  );

  if (!teacher) {
    return (
      <div className="teacher-not-found">
        <h2>Teacher Not Found</h2>
        <p>The teacher you are looking for does not exist.</p>

        <Link to="/teachers">
          Back to Teachers
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${teacher.name}?`
    );

    if (!confirmed) {
      return;
    }

    deleteTeacher(teacher.id);

    navigate("/teachers");
  };

  return (
    <div className="teacher-details-page">

      <div className="teacher-details-header">
        <div>
          <h1>Teacher Details</h1>
          <p>View teacher information</p>
        </div>

        <Link to="/teachers">
          ← Back to Teachers
        </Link>
      </div>

      <div className="teacher-details-card">

        <div className="teacher-avatar">
          {teacher.name.charAt(0).toUpperCase()}
        </div>

        <div className="teacher-main-info">
          <h2>{teacher.name}</h2>

          <span
            className={`status ${teacher.status.toLowerCase()}`}
          >
            {teacher.status}
          </span>
        </div>

        <div className="teacher-info-grid">

          <div className="info-item">
            <span>Email</span>
            <strong>{teacher.email}</strong>
          </div>

          <div className="info-item">
            <span>Phone</span>
            <strong>{teacher.phone}</strong>
          </div>

          <div className="info-item">
            <span>Gender</span>
            <strong>{teacher.gender}</strong>
          </div>

          <div className="info-item">
            <span>Subject</span>
            <strong>{teacher.subject}</strong>
          </div>

          <div className="info-item">
            <span>Qualification</span>
            <strong>{teacher.qualification}</strong>
          </div>

          <div className="info-item">
            <span>Experience</span>
            <strong>
              {teacher.experience} years
            </strong>
          </div>

        </div>

        <div className="teacher-detail-actions">

          <Link
            to={`/teachers/${teacher.id}/edit`}
            className="edit-btn"
          >
            Edit Teacher
          </Link>

          <button
            onClick={handleDelete}
            className="delete-btn"
          >
            Delete Teacher
          </button>

        </div>

      </div>
    </div>
  );
}

export default TeacherDetails;
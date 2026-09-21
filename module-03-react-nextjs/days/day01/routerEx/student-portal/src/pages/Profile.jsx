import { Link } from "react-router-dom";
import "./profile.css";

function Profile({ form }) {
  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">MA</div>

          <h1>{form.name}</h1>
          <p>{form.department} Student</p>
        </div>

        {/* Profile Information */}
        <div className="profile-info">
          <div className="profile-item">
            <span>Full Name</span>
            <strong>{form.name}</strong>
          </div>

          <div className="profile-item">
            <span>Email</span>
            <strong>{form.email}</strong>
          </div>

          <div className="profile-item">
            <span>Department</span>
            <strong>{form.department}</strong>
          </div>

          <div className="profile-item">
            <span>Phone</span>
            <strong>{form.phone}</strong>
          </div>

          <div className="profile-item">
            <span>Student ID</span>
            <strong>ST001</strong>
          </div>
        </div>

        {/* Edit Button */}
        <Link to="/edit-profile" className="edit-profile-btn">
          Edit Profile
        </Link>
      </div>
    </div>
  );
}

export default Profile;

import { useNavigate } from "react-router-dom";
import "./profile.css";

function EditProfile({ form, setForm }) {
  const navigate = useNavigate();

  // const [name, setName] = useState("Mohammed Ali");
  // const [email, setEmail] = useState("mohammed@example.com");
  // const [department, setDepartment] = useState("Computer Science");
  // const [phone, setPhone] = useState("+251 900 000 000");

  function formControl(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function changeProfile(event) {
    event.preventDefault();

    alert("Profile Changed Successfully!");
    navigate("/profile", { replace: true });
    console.log(form);
  }

  return (
    <div className="profile-page">
      <div className="edit-profile-card">
        <h1>Edit Profile</h1>
        <p>Update your personal information</p>

        <form onSubmit={changeProfile}>
          {/* Name */}
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Enter your name"
              onChange={formControl}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              // onChange={(event) => setEmail(event.target.value)}
              onChange={formControl}
              placeholder="Enter your email"
            />
          </div>

          {/* Department */}
          <div className="form-group">
            <label>Department</label>

            <select
              name="department"
              value={form.department}
              onChange={formControl}
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option>Software Engineering</option>
              <option>Accounting</option>
              <option>Management</option>
            </select>
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone</label>

            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={formControl}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/profile")}
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

export default EditProfile;

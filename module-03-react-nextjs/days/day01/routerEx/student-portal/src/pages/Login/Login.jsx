import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(
      formData.email,
      formData.password
    );

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>School Management System</h1>

        <p>Login to your account</p>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p>Admin:admin@school.com, Password:admin123</p>
          <p>Teacher:ahmed@example.com, Password:teacher123 </p>
          <p>Student:abebe@example.com,Password:student123</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
import { useLocation, useNavigate } from "react-router-dom";
import "./login.css";

function Login({ setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  function handleLogin(e) {
    e.preventDefault();

    setUser({ name: "Mohammed" });

    navigate(from, { replace: true });
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back 👋</h1>
          <p>Login to continue to your account</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="emailId">Email</label>
            <input
              type="email"
              name="email"
              id="emailId"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              name="password"
              id="pass"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="login-footer">Welcome to the Student Portal</p>
      </div>
    </div>
  );
}

export default Login;

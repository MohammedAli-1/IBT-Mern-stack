import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const destination = location.state?.from?.pathname || "/checkout";

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) return;

    onLogin();
    navigate(destination, { replace: true });
  }

  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default Login;

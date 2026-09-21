import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About */}
        <div className="footer-section">
          <h2 className="footer-logo">
            Student<span>Hub</span>
          </h2>

          <p>
            Manage your learning journey, courses, students, and profile in one
            simple platform.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <NavLink to="/">Home</NavLink>
          <NavLink to="/course">Courses</NavLink>
          <NavLink to="/student">Students</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>

          <p>Email: mohammedalikebede1996.com</p>
          <p>Phone: +251 928942829</p>
          <p>Addis Ababa, Ethiopia</p>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>Follow Us</h3>

          <div className="social-links">
            <a href="#" target="_blank" rel="noreferrer">
              Facebook
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              Telegram
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              LinkedIn
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2026 StudentHub. All rights reserved.</p>

        <div className="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

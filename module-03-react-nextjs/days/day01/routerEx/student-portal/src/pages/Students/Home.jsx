import { Link } from "react-router-dom";

import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      {/* ================= HERO ================= */}

      <section className="home-hero">
        <div className="home-hero-content">
          <span className="home-badge">SCHOOL MANAGEMENT SYSTEM</span>

          <h1>
            Manage Your School
            <br />
            <span>Smarter and Easier</span>
          </h1>

          <p>
            SchoolMS helps administrators, teachers, students, and parents
            manage academic information in one simple and organized system.
          </p>

          <div className="home-hero-actions">
            <Link to="/login" className="home-primary-button">
              Login to SchoolMS
            </Link>

            <a href="#features" className="home-secondary-button">
              Explore Features
            </a>
          </div>
        </div>

        <div className="home-hero-card">
          <div className="hero-card-header">
            <span>School Overview</span>
            <span className="hero-status">● Active</span>
          </div>

          <div className="hero-stat-grid">
            <div className="hero-stat">
              <strong>1,250</strong>
              <span>Students</span>
            </div>

            <div className="hero-stat">
              <strong>85</strong>
              <span>Teachers</span>
            </div>

            <div className="hero-stat">
              <strong>42</strong>
              <span>Classes</span>
            </div>

            <div className="hero-stat">
              <strong>28</strong>
              <span>Courses</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className="home-features" id="features">
        <div className="home-section-header">
          <span>FEATURES</span>

          <h2>Everything Your School Needs</h2>

          <p>
            A centralized system for managing students, teachers, classes,
            courses, and academic activities.
          </p>
        </div>

        <div className="home-feature-grid">
          <div className="home-feature-card">
            <div className="feature-icon">👨‍🎓</div>

            <h3>Student Management</h3>

            <p>
              Manage student information, classes, academic records, and
              profiles from one place.
            </p>
          </div>

          <div className="home-feature-card">
            <div className="feature-icon">👨‍🏫</div>

            <h3>Teacher Management</h3>

            <p>
              Organize teachers, assigned courses, classes, and teaching
              responsibilities.
            </p>
          </div>

          <div className="home-feature-card">
            <div className="feature-icon">📚</div>

            <h3>Courses & Classes</h3>

            <p>
              Manage courses, classes, sections, subjects, and academic
              information efficiently.
            </p>
          </div>

          <div className="home-feature-card">
            <div className="feature-icon">📊</div>

            <h3>Academic Reports</h3>

            <p>
              Track attendance, grades, results, and other important academic
              information.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ROLES ================= */}

      <section className="home-roles">
        <div className="home-section-header">
          <span>FOR EVERYONE</span>

          <h2>One System, Different Roles</h2>
        </div>

        <div className="home-role-grid">
          <div className="home-role-card">
            <div>🧑‍💼</div>
            <h3>Administrator</h3>
            <p>Manage the entire school system and academic operations.</p>
          </div>

          <div className="home-role-card">
            <div>👨‍🏫</div>
            <h3>Teacher</h3>
            <p>
              Manage assigned classes, students, courses, attendance, and
              grades.
            </p>
          </div>

          <div className="home-role-card">
            <div>🎓</div>
            <h3>Student</h3>
            <p>
              View your courses, class, attendance, grades, and academic
              information.
            </p>
          </div>

          <div className="home-role-card">
            <div>👪</div>
            <h3>Parent</h3>
            <p>
              Monitor your children's academic progress and school information.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="home-cta">
        <div>
          <h2>Ready to manage your school?</h2>

          <p>Sign in to access your SchoolMS dashboard.</p>
        </div>

        <Link to="/login" className="home-cta-button">
          Get Started
        </Link>
      </section>
    </div>
  );
}

export default Home;

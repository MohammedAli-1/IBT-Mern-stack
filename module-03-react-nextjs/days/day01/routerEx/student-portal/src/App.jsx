import { Routes, Route } from "react-router-dom";

import "./App.css";

// Public layout
import Layout from "./Layout";

// Authentication
import RequireAuth from "./RequireAuth";

// Dashboard layout
import DashboardLayout from "./Layouts/DashboardLayout";

// Public pages
import Home from "./pages/Students/Home";
import Login from "./pages/Login/Login";

// Dashboard
import Dashboard from "./pages/Dashboard/Dashboard";

// Student pages
import Profile from "./pages/Students/Profile";
import EditProfile from "./pages/Students/EditProfile";
import Students from "./pages/Students/Students";
import AddStudent from "./pages/Students/AddStudent";
import StudentDetail from "./pages/Students/StudentDetail";
import EditStudent from "./pages/Students/EditStudent";

// Teacher pages
import Teachers from "./pages/Teachers/Teachers";
import AddTeacher from "./pages/Teachers/AddTeacher";
import TeacherDetails from "./pages/Teachers/TeacherDetails";
import EditTeacher from "./pages/Teachers/EditTeacher";

// Course pages
import Courses from "./pages/Courses/Courses";
import AddCourse from "./pages/Courses/AddCourse";
import CourseDetails from "./pages/Courses/CourseDetails";
import EditCourse from "./pages/Courses/EditCourse";

// Class pages
import Classes from "./pages/Classes/Classes";
import AddClass from "./pages/Classes/AddClass";
import ClassDetails from "./pages/Classes/ClassDetails";
import EditClass from "./pages/Classes/EditClass";

// Other
import NotFound from "./pages/Students/NotFound";
import AuthLayout from "./Layouts/AuthLayout";

function App() {
  return (
    <Routes>
      {/* =================================
          PUBLIC ROUTES
      ================================= */}

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* =================================
          PROTECTED ROUTES
      ================================= */}

      <Route element={<RequireAuth />}>
        {/* =================================
            DASHBOARD LAYOUT
        ================================= */}

        <Route element={<DashboardLayout />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* =================================
              STUDENTS
          ================================= */}

          <Route path="/students" element={<Students />} />

          <Route path="/students/new" element={<AddStudent />} />

          <Route path="/students/:id" element={<StudentDetail />} />

          <Route path="/students/:id/edit" element={<EditStudent />} />

          {/* =================================
              TEACHERS
          ================================= */}

          <Route path="/teachers" element={<Teachers />} />

          <Route path="/teachers/add" element={<AddTeacher />} />

          <Route path="/teachers/:id" element={<TeacherDetails />} />

          <Route path="/teachers/:id/edit" element={<EditTeacher />} />

          {/* =================================
              COURSES
          ================================= */}

          <Route path="/courses" element={<Courses />} />

          <Route path="/courses/add" element={<AddCourse />} />

          <Route path="/courses/:id" element={<CourseDetails />} />

          <Route path="/courses/:id/edit" element={<EditCourse />} />

          {/* =================================
              CLASSES
          ================================= */}

          <Route path="/classes" element={<Classes />} />

          <Route path="/classes/add" element={<AddClass />} />

          <Route path="/classes/:id" element={<ClassDetails />} />

          <Route path="/classes/:id/edit" element={<EditClass />} />

          {/* =================================
              PROFILE
          ================================= */}

          <Route path="/profile" element={<Profile />} />

          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Route>

      {/* =================================
          404
      ================================= */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

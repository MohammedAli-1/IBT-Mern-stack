import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Course from "./pages/Course";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import NotFound from "./pages/NotFound";
import Layout from "./Layout";
import EditProfile from "./pages/EditProfile";
import RequireAuth from "./RequireAuth";
import AddStudent from "./pages/AddStudent";
import { StudentProvider } from "./context/StudentContext";
import EditStudent from "./pages/EditStudent";

function App() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "Mohammed Ali",
    email: "mohammed@example.com",
    department: "Computer Science",
    phone: "+25100000",
  });
  return (
    <>
      <StudentProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="courses" element={<Course />} />
            <Route path="login" element={<Login setUser={setUser} />} />
            <Route
              path="profile"
              element={
                <RequireAuth user={user}>
                  <Profile form={form} />
                </RequireAuth>
              }
            />
            <Route
              path="edit-profile"
              element={
                <RequireAuth user={user}>
                  <EditProfile setForm={setForm} form={form} />
                </RequireAuth>
              }
            />
            <Route path="students" element={<Students />} />
            <Route path="/students/new" element={<AddStudent />} />
            <Route path="students/:id" element={<StudentDetail />} />
            <Route path="students/:id/edit" element={<EditStudent />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </StudentProvider>
    </>
  );
}

export default App;

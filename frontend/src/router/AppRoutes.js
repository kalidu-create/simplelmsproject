// frontend/src/routes/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import AddCourse from "../pages/AddCourse";
import Login from "../pages/Login";
import Register from "../pages/Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/add-course" element={<AddCourse />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Optional: 404 page */}
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
}

export default AppRoutes;

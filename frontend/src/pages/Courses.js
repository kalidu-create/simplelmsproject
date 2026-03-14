// frontend/src/pages/Courses.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import API from "../services/api";
import "./Courses.css"; // optional CSS

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all courses from backend
    API.get("/courses")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <section className="courses-page">
        <h1>All Courses</h1>
        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length > 0 ? (
          <div className="courses-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p>No courses available right now.</p>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Courses;

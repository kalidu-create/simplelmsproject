// frontend/src/pages/Home.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import API from "../services/api";
import "./Home.css";

function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  return (
    <div>
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to LMS</h1>
          <p>Learn anytime, anywhere, at your own pace!</p>
        </div>
      </section>

      <section className="courses-preview">
        <h2>Our Courses</h2>
        <div className="courses-grid">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <p>No courses available right now.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;

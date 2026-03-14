// frontend/src/components/CourseCard.js
import React from "react";
import "./CourseCard.css";

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      {/* Optional: add a button */}
      <button className="enroll-btn">Enroll</button>
    </div>
  );
}

export default CourseCard;

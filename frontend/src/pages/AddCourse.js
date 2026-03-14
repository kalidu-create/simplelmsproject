// frontend/src/pages/AddCourse.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import "./AddCourse.css";

function AddCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const res = await API.post("/courses", formData);
      setMessage("Course added successfully!");
      setFormData({ title: "", description: "" }); // reset form
    } catch (err) {
      console.error(err);
      setMessage("Failed to add course. Try again.");
    }
  };

  return (
    <div>
      <Navbar />

      <section className="add-course-page">
        <h1>Add New Course</h1>

        <form className="add-course-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Course Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter course title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Course Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter course description"
              rows="5"
            />
          </div>

          <button type="submit">Add Course</button>
          {message && <p className="form-message">{message}</p>}
        </form>
      </section>

      <Footer />
    </div>
  );
}

export default AddCourse;

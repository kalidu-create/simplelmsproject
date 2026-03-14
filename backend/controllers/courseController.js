// courseController.js
const db = require('../config/db');

// Get all courses
const getCourses = (req, res) => {
  const query = "SELECT * FROM courses";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching courses:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json(results);
  });
};

// Get a single course by id
export const getCourseById = (req, res) => {
  const courseId = req.params.id;
  const query = "SELECT * FROM courses WHERE id = ?";
  db.query(query, [courseId], (err, results) => {
    if (err) {
      console.error("Error fetching course:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(results[0]);
  });
};

// Add a new course
export const addCourse = (req, res) => {
  const { title, description, price } = req.body;
  const query = "INSERT INTO courses (title, description, price) VALUES (?, ?, ?)";
  db.query(query, [title, description, price], (err, result) => {
    if (err) {
      console.error("Error adding course:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({ message: "Course added", courseId: result.insertId });
  });
};

// Update an existing course
export const updateCourse = (req, res) => {
  const courseId = req.params.id;
  const { title, description, price } = req.body;
  const query = "UPDATE courses SET title = ?, description = ?, price = ? WHERE id = ?";
  db.query(query, [title, description, price, courseId], (err, result) => {
    if (err) {
      console.error("Error updating course:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course updated" });
  });
};

// Delete a course
export const deleteCourse = (req, res) => {
  const courseId = req.params.id;
  const query = "DELETE FROM courses WHERE id = ?";
  db.query(query, [courseId], (err, result) => {
    if (err) {
      console.error("Error deleting course:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted" });
  });
};

module.exports = { getCourses, getCourseById, addCourse, updateCourse, deleteCourse };


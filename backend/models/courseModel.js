// courseModel.js
import db from '../db.js';

// Get all courses
export const getAllCourses = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM courses";
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Get a single course by ID
export const getCourseById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM courses WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

// Add a new course
export const addCourse = (course) => {
  return new Promise((resolve, reject) => {
    const { title, description, price } = course;
    const query = "INSERT INTO courses (title, description, price) VALUES (?, ?, ?)";
    db.query(query, [title, description, price], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};

// Update a course by ID
export const updateCourse = (id, course) => {
  return new Promise((resolve, reject) => {
    const { title, description, price } = course;
    const query = "UPDATE courses SET title = ?, description = ?, price = ? WHERE id = ?";
    db.query(query, [title, description, price, id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows);
    });
  });
};

// Delete a course by ID
export const deleteCourse = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM courses WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows);
    });
  });
};

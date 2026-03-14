const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET courses
router.get("/", (req, res) => {
  db.query("SELECT * FROM courses", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// ADD course
router.post("/", (req, res) => {
  const { title, description } = req.body;

  db.query(
    "INSERT INTO courses (title, description) VALUES (?, ?)",
    [title, description],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "Course added successfully" });
      }
    }
  );
});

module.exports = router;

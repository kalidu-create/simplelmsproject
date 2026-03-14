// authController.js
const db = require('../config/db');

// Register user
const registerUser = (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const checkQuery = "SELECT * FROM users WHERE email = ?";

  db.query(checkQuery, [email], (err, results) => {

    if (err) {
      console.error("Error checking user:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const insertQuery =
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(
      insertQuery,
      [name, email, password],
      (err, result) => {

        if (err) {
          console.error("Error registering user:", err);
          return res.status(500).json({ message: "Database error" });
        }

        res.status(201).json({
          message: "User registered successfully",
          userId: result.insertId
        });

      }
    );

  });

};



// Login user
const loginUser = (req, res) => {

  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], (err, results) => {

    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  });

};

module.exports = { registerUser, loginUser };

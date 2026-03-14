const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/courses", courseRoutes);
app.use("/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("LMS Backend Running");
});

// Example route (optional)
app.get("/allcourses", (req, res) => {
  db.query("SELECT * FROM courses", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

app.use("/courses", courseRoutes);



// Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

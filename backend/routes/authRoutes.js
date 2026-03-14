const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
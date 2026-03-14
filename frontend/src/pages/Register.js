// frontend/src/pages/Register.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import "./Auth.css";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      await API.post("/auth/register", formData);

      setMessage("Registration successful! You can now log in.");

      setFormData({
        name: "",
        email: "",
        password: ""
      });

    } catch (err) {
      console.error(err);
      setMessage("Registration failed. Try again.");
    }
  };

  return (
    <div>
      <Navbar />

      <section className="auth-page">
        <h1>Register</h1>

        <form className="auth-form" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Register</button>

          {message && <p className="form-message">{message}</p>}

        </form>
      </section>

      <Footer />
    </div>
  );
}

export default Register;

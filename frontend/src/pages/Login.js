// // frontend/src/pages/Login.js
// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import API from "../services/api";
// import "./Auth.css";

// function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       setMessage("Please fill in all fields.");
//       return;
//     }

//     try {
//       const res = await API.post("/auth/login", formData);
//       setMessage("Login successful!");
//       localStorage.setItem("userToken", res.data.token); // optional JWT
//       setFormData({ email: "", password: "" });
//       // Redirect or navigate to courses page
//       window.location.href = "/courses";
//     } catch (err) {
//       console.error(err);
//       setMessage("Login failed. Check your credentials.");
//     }
//   };

//   return (
//     <div>
//       <Navbar />

//       <section className="auth-page">
//         <h1>Login</h1>

//         <form className="auth-form" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//           />

//           <button type="submit">Login</button>

//           {message && <p className="form-message">{message}</p>}
//         </form>
//       </section>

//       <Footer />
//     </div>
//   );
// }

// export default Login;

// frontend/src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await API.post("/auth/login", formData);

      // Save token if your backend provides JWT
      localStorage.setItem("userToken", res.data.token);

      setMessage("Login successful!");
      setFormData({ email: "", password: "" });

      // Navigate to courses page
      navigate("/courses");
    } catch (err) {
      console.error(err);
      // Show backend error if available
      setMessage(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <section className="auth-page">
        <h1>Login</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && <p className="form-message">{message}</p>}
        </form>
      </section>

      <Footer />
    </div>
  );
}

export default Login;

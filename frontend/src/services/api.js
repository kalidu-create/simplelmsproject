// // frontend/src/services/api.js
// import axios from "axios";
// import API from "./services/api";

// // Create an Axios instance
// const API = axios.create({
//   baseURL: "http://localhost:5000", // Backend URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor to attach token (optional, for logged-in users)
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("userToken"); // JWT stored after login
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


// API.get("/courses")
//   .then(res => console.log(res.data))
//   .catch(err => console.error(err));

//   const newCourse = {
//   title: "React Basics",
//   description: "Learn React step by step",
// };

// API.post("/courses", newCourse)
//   .then(res => console.log("Course added:", res.data))
//   .catch(err => console.error(err));

//   const user = {
//   name: "John Doe",
//   email: "john@example.com",
//   password: "123456",
// };

// API.post("/auth/register", user)
//   .then(res => console.log("Registered:", res.data))
//   .catch(err => console.error(err));
// const loginData = {
//   email: "john@example.com",
//   password: "123456",
// };

// API.post("/auth/login", loginData)
//   .then(res => {
//     console.log("Token:", res.data.token);
//     localStorage.setItem("userToken", res.data.token);
//   })
//   .catch(err => console.error(err));


// export default API;
// frontend/src/services/api.js
import axios from "axios";

// 1. Create the Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000", // Your Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Request interceptor to attach JWT token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * NOTE: It is better to wrap your API calls in functions 
 * so you can call them from your Components (like Login.js or CourseList.js)
 * instead of having them run automatically when the file loads.
 */

export const getCourses = () => API.get("/courses");

export const registerUser = (userData) => API.post("/auth/register", userData);

export const loginUser = async (loginData) => {
  const response = await API.post("/auth/login", loginData);
  if (response.data.token) {
    localStorage.setItem("userToken", response.data.token);
  }
  return response.data;
};

// Export the base instance as default
export default API;
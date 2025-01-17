import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./CSS/Register.css"; // External CSS file for custom styles

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://password-manager2-alpha.vercel.app/api/users/register",
        formData
      );

      // Show success message using SweetAlert2
      Swal.fire({
        title: "Success!",
        text: "User registered successfully!",
        icon: "success",
        confirmButtonText: "Okay",
      });
    } catch (error) {
      // Show error message using SweetAlert2
      Swal.fire({
        title: "Error!",
        text: error.response.data.message || "An error occurred.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <>
      <div className="bgImg">
        <div className="register-container d-flex justify-content-center align-items-center">
          <div className="card shadow-lg p-4">
            <h2 className="text-center text-primary mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  name="username"
                  id="username"
                  className="form-control"
                  placeholder="Enter your username"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login here</Link>
            </p>

            <span
              style={{ fontSize: "14px", color: "red" }}
              className="text-center"
            >
              This application made testing purposes for only!
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

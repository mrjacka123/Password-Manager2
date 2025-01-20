import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./CSS/Register.css"; // External CSS file for custom styles

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // New state for spinner
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show the spinner when the login button is clicked
    setIsLoading(true);

    try {
      // Send login request to the backend
      const response = await axios.post(
        "https://password-manager2-alpha.vercel.app/api/users/login",
        formData
      );

      // Extract user details from the response
      const { username, email } = response.data;

      // Redirect to the Home page with username and email
      navigate("/home", { state: { username, email } });
    } catch (error) {
      // Use SweetAlert2 to show a pop-up for errors
      Swal.fire({
        title: "Login failed",
        text: "Invalid credentials. Please check your email and password.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      // Hide the spinner after 2 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="bgImg">
        <div className="login-container d-flex justify-content-center align-items-center">
          <div className="card shadow-lg p-4">
            <h2 className="text-white mb-4 custom-underline">Login</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-white">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control bg-dark text-white"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 text-white">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control bg-dark text-white"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="accBtn btn btn-primary w-100">
                Login
              </button>

              {isLoading && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </form>
            <p className="text-center mt-3 text-secondary">
              Don't have an account?{" "}
              <Link className="text-decoration-none" to="/register">
                Register here
              </Link>
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

export default Login;

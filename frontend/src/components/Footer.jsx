import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Home.css";
import { Linkedin, Github, Coffee } from "lucide-react";

const Footer = () => {
  return (
    <div className="text-white py-4 mt-5">
      <div className="container text-center">
        <h6 className="mb-3 text-secondary">
          ©2025 Designed by Ruchira Kaluarachchi | All Rights Reserved |{" "}
          <Link
            className="text-secondary font-weight-bold"
            style={{ textDecoration: "none" }}
            to="https://www.ruchiralk.me/"
          >
            www.ruchiralk.me
          </Link>
        </h6>

        <div className="mb-3">
          <Link
            className="text-white bg-primary p-2 mx-2 rounded"
            style={{ textDecoration: "none" }}
            to="https://www.linkedin.com/in/ruchira-kaluarachchi"
            aria-label="LinkedIn"
          >
            <Linkedin size={"24px"} />
          </Link>
          <Link
            className="text-white bg-secondary p-2 mx-2 rounded"
            style={{ textDecoration: "none" }}
            to="https://github.com/ruchiralkm"
            aria-label="GitHub"
          >
            <Github size={"24px"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

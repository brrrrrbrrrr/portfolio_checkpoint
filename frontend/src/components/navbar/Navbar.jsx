/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function Navbar() {
  const { userLog, visitUserData } = useUser();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return userLog || visitUserData ? (
    <div className="nav-container">
      <ul className="nav-ul-container">
        <li>
          <Link
            to="/home"
            className={`link ${activeLink === "/" ? "active-menu" : ""}`}
          >
            Accueil
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            className={`link ${
              activeLink === "/projects" ? "active-menu" : ""
            }`}
          >
            Projets
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`link ${activeLink === "/about" ? "active-menu" : ""}`}
          >
            À propos
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={`link ${activeLink === "/contact" ? "active-menu" : ""}`}
          >
            Contacts
          </Link>
        </li>
      </ul>
    </div>
  ) : (
    ""
  );
}

export default Navbar;

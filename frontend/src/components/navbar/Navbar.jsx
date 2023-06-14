import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function Nav() {
  const { userLog } = useUser();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <div>
      {userLog && (
        <div className="nav-container">
          <ul className="nav-ul-container">
            <li>
              <Link
                to="/"
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
                className={`link ${
                  activeLink === "/about" ? "active-menu" : ""
                }`}
              >
                À propos
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`link ${
                  activeLink === "/contact" ? "active-menu" : ""
                }`}
              >
                Contacts
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className={`link ${
                  activeLink === "/admin" ? "active-menu" : ""
                }`}
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Nav;

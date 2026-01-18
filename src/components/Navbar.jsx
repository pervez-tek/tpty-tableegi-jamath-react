import React from "react";
import { Link, NavLink } from "react-router-dom";
import Collapse from "bootstrap/js/dist/collapse";
import makkah from "../assets/images/makkah.jpg";
import { useAuth } from "./auth/AuthContext";
import Api from "./Api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./navbar.css";



function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();


  const toggleMenu = () => {
    const nav = document.getElementById("navbarNav");
    if (!nav) return;

    const bsCollapse =
      Collapse.getInstance(nav) || new Collapse(nav, { toggle: false });

    bsCollapse.toggle(); // 👈 open if closed, close if open
  };


  const navigate = useNavigate();

  const closeMenu = () => {
    const nav = document.getElementById("navbarNav");
    if (nav) {
      const bsCollapse =
        Collapse.getInstance(nav) || new Collapse(nav, { toggle: false });
      bsCollapse.hide();
    }
  };
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const singout = async () => {

    console.log("signout calling")

    // Build payload from context or fallback to sessionStorage 
    const payload = user ?? JSON.parse(sessionStorage.getItem("user") || "{}");
    console.log("Payload" + payload);
    await axios.post(`${API_URL}/signOut`, payload, { withCredentials: true })
      .then(response => {
        console.log("DTO:", response.data);
        logout();
        navigate("/"); // redirect 
      })
      .catch(error => {
        console.error("Error:", error.response?.data || error.message);
        const backendMessage = error.response?.data?.message || error.message;

        console.log("Erro:" + backendMessage);
      });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/surveyForm">
          <img
            className="rounded-circle"
            src={makkah}
            alt="image"
            height="50px"
            width="50px"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" onClick={closeMenu}>
                  Admin
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/surveyForm" onClick={closeMenu}>
                User
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={closeMenu}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" onClick={closeMenu}>
                Contact
              </NavLink>
            </li>

            {isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/addMasjid"
                  onClick={closeMenu}
                >
                  Add Masjid
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  onClick={() => {
                    singout();
                    closeMenu();
                  }}
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

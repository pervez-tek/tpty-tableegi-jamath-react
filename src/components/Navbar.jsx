import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Collapse from "bootstrap/js/dist/collapse";
import makkah from "../assets/images/makkah.jpg";
import { useAuth } from "./auth/AuthContext";
import Api from "./Api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./navbar.css";

import { GrUserAdmin } from "react-icons/gr";
import { RiBroadcastFill, RiLogoutCircleLine, RiSurveyLine } from "react-icons/ri";
import { TbArrowRoundaboutLeft, TbReportSearch } from "react-icons/tb";
import { MdContactMail, MdMosque, MdNightlight, MdOutlineNightlight } from "react-icons/md";
import { FaMosque } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";

function Navbar({ menuOpen, setMenuOpen }) {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // ✅ Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };



  // const toggleMenu = () => {
  //   const nav = document.getElementById("navbarNav");
  //   if (!nav) return;

  //   const bsCollapse =
  //     Collapse.getInstance(nav) || new Collapse(nav, { toggle: false });

  //   bsCollapse.toggle(); // 👈 open if closed, close if open
  // };

  // const closeMenu = () => {
  //   const nav = document.getElementById("navbarNav");
  //   if (nav) {
  //     const bsCollapse =
  //       Collapse.getInstance(nav) || new Collapse(nav, { toggle: false });
  //     bsCollapse.hide();
  //   }
  // };

  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const singout = async () => {

    console.log("signout calling")

    // Build payload from context or fallback to sessionStorage 
    const payload = user ?? JSON.parse(sessionStorage.getItem("user") || "{}");
    console.log("Payload" + JSON.stringify(payload));
    await axios.post(`${API_URL}/signOut`, payload, { withCredentials: true })
      .then(response => {
        console.log("DTO:", response.data);
        logout();
        navigate("/login"); // redirect 
      })
      .catch(error => {
        console.error("Error:", error.response?.data || error.message);
        const backendMessage = error.response?.data?.message || error.message;

        console.log("Erro:" + backendMessage);
        logout();
        navigate("/login"); // redirect 
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

        <div className="me-auto d-flex align-items-center gap-2">
          <ImLocation2 className="location-icon glow-icon-warning" />
          <span className="fw-semibold text-white-50 glow-icon-warning" style={{ cursor: 'pointer' }}>Tirupati</span>
        </div>

        {/* <div className="me-auto d-flex align-items-right gap-2">
          <MdNightlight className="location-icon" />
          <MdOutlineNightlight />
        </div> */}


        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>



        <div className={`navbar-collapse animated-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn && (
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                  isActive ? "nav-link active active-link" : "nav-link"}
                  to="/login" onClick={closeMenu}>

                  Admin &nbsp;
                  <GrUserAdmin className="menu-icons" />
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className={({ isActive }) =>
                isActive ? "nav-link active active-link" : "nav-link"}
                to="/surveyForm" onClick={closeMenu}>
                Survey &nbsp;
                <RiSurveyLine className="menu-icons" />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) =>
                isActive ? "nav-link active active-link" : "nav-link"}
                to="/about" onClick={closeMenu}>
                About &nbsp;
                <TbArrowRoundaboutLeft className="menu-icons" />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) =>
                isActive ? "nav-link active active-link" : "nav-link"}
                to="/listOfMasjids" onClick={closeMenu}>
                List Of Majids &nbsp;
                <MdMosque className="menu-icons" />
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"}
                to="/loginForm" onClick={closeMenu}>
                Login Form
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink className={({ isActive }) =>
                isActive ? "nav-link active active-link" : "nav-link"}
                to="/contact" onClick={closeMenu}>
                Contact &nbsp;
                <MdContactMail className="menu-icons" />
              </NavLink>
            </li>

            {isLoggedIn && (
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                  isActive ? "nav-link active active-link" : "nav-link"}
                  to="/addMasjid"
                  onClick={closeMenu}
                >
                  Add Masjid &nbsp;
                  <FaMosque className="menu-icons" />
                </NavLink>
              </li>
            )}

            {isLoggedIn && (
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                  isActive ? "nav-link active active-link" : "nav-link"}
                  to="/broadCastMessage"
                  onClick={closeMenu}
                >
                  Broadcast Message &nbsp;
                  <RiBroadcastFill className="menu-icons" />
                </NavLink>
              </li>
            )}



            {isLoggedIn && (
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                  isActive ? "nav-link active active-link" : "nav-link"}
                  to="/reports"
                  onClick={closeMenu}
                >
                  Reports &nbsp;
                  <TbReportSearch className="menu-icons" />
                </NavLink>
              </li>
            )}

            {isLoggedIn && (
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                  isActive ? "nav-link active active-link" : "nav-link"}
                  to="/login"
                  onClick={() => {
                    singout();
                    closeMenu();
                  }}
                >
                  Logout &nbsp;
                  <RiLogoutCircleLine className="menu-icons" />
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

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
import LocationSelector from "./LocationSelector";

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

        <LocationSelector />
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
                <hr
                  style={{
                    borderTop: "1px solid rgb(255, 255, 255)",
                    margin: "8px 0"
                  }}
                />
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

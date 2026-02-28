import { Link, NavLink } from "react-router-dom";
import "./footer.css";
import prayer from "../assets/images/Prayer.png";
import mat from "../assets/images/Prayer Mat.png";
import qibla from "../assets/images/qibla finder.png";
import { useState } from "react";

const Footer = ({ menuOpen, setMenuOpen }) => {
  const [image, setImage] = useState(prayer);

  const closeMenu = () => {
    setMenuOpen(false);   // Always close
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (

    <footer className="mobile-footer">
      <NavLink to="/namazTimings" className="footer-link" onClick={closeMenu}>
        <div className="glow-wrapper">
          <img
            className="rounded-circle glow-img"
            src={image}
            alt="image"
            onClick={() => {              
              setImage(image === prayer ? mat : prayer);
            }}
          />
        </div>
      </NavLink>
      <div>
        <p className="mb-1">© 2026 Tableegi Jamath Survey App</p>

        <NavLink to="/feedBack" className="footer-link" onClick={closeMenu}>
          <button
            className="btn btn-dark glow-warning">
            Send Feedback
          </button>
        </NavLink>
      </div>
      <NavLink to="/qiblaFinder" className="footer-link" onClick={closeMenu}>
        <div className="glow-wrapper">
          <img
            className="rounded-circle glow-img"
            src={qibla}
            alt="image"            
          />
        </div>
      </NavLink>
    </footer>

  )
}

export default Footer;

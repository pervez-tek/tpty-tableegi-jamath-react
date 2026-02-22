import { Link, NavLink } from "react-router-dom";
import "./footer.css";
import prayer from "../assets/images/Prayer.png";
import mat from "../assets/images/Prayer Mat.png";
import qibla from "../assets/images/qibla finder.png";
import { useState } from "react";

const Footer = () => {
  const [image, setImage] = useState(prayer);

  return (
    <footer className="mobile-footer">
      <NavLink to="/namazTimings" className="footer-link">
        <div className="glow-wrapper">
          <img
            className="rounded-circle glow-img"
            src={image}
            alt="image"
            onClick={() => setImage(image === prayer ? mat : prayer)}
          />
        </div>
      </NavLink>
      <div>
        <p className="mb-1">© 2026 Tableegi Jamath Survey App</p>

        <NavLink to="/feedBack" className="footer-link">
          <button
            className="btn btn-dark glow-warning">
            Send Feedback
          </button>
        </NavLink>
      </div>
      <NavLink to="/qiblaFinder" className="footer-link">
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

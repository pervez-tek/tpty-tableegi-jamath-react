import { Link, NavLink } from "react-router-dom";
import "./footer.css";

const Footer = () => (
  <footer className="mobile-footer">
    <p className="mb-1">© 2026 Tableegi Jamath Survey App</p>

    <NavLink to="/feedBack" className="footer-link">
      <button
        className="btn btn-dark glow-warning">
        Send Feedback
      </button>
    </NavLink>
  </footer>




);

export default Footer;

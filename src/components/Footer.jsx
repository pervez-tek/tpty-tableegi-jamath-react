import { Link, NavLink } from "react-router-dom";

const Footer = () => (
  <footer className="bg-dark text-white text-center py-3 mt-2 sticky-bottom">
    © 2026 Tableegi Jamath Survey App
    <NavLink className="nav-link" to="/feedBack">
      Send Feedback
    </NavLink>
  </footer>
);

export default Footer;

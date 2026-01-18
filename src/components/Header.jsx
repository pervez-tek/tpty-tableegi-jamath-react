import { Routes, Route, Link, NavLink } from 'react-router-dom'
import SurveyForm from './SurveyForm';
import Admin from './Admin';

const navLinkStyles = ({ isActive }) => ({
    color: isActive ? '#e1e7ec' : '#d8a2a2',
    textDecoration: isActive ? 'none' : 'underline',
    fontWeight: isActive ? 'bold' : 'normal',
    padding: '5px 10px'
});
const Header = () => (

    <nav className="navbar navbar-dark bg-dark app-header">
        <div className="container-fluid row justify-content-center">
            <span className="navbar-brand mb-0 h1">
                <nav>
                    <NavLink to="/login" style={navLinkStyles}>Admin</NavLink>
                    <NavLink to="/surveyForm" style={navLinkStyles}>User</NavLink>
                    <NavLink to="/about" style={navLinkStyles}>About</NavLink>
                    <NavLink to="/contact" style={navLinkStyles}>Contact</NavLink>
                    <NavLink to="/addMasjid" style={navLinkStyles}>Add Masjid</NavLink>
                </nav>
            </span>
        </div>
    </nav>
);

export default Header;

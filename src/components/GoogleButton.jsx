import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function GoogleButton({ onClick }) {

    const GOOGLE_API_URL = import.meta.env.VITE_OAUTH2_BACK_END_GOOGLE_URL

    function GoogleLogin() {        
        window.location.href = GOOGLE_API_URL;
        // notify parent first 
        if (onClick) { onClick(); }
    }
    return (

        <button className="btn btn-light border d-flex align-items-center gap-2 w-100 w-md-auto" onClick={GoogleLogin}>
            <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                style={{ width: "20px", height: "20px" }}
            />


        </button>
    );
}

export default GoogleButton;

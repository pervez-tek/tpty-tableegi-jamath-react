import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function GoogleButton({ onClick ,socialLogin}) {

    const GOOGLE_API_URL = import.meta.env.VITE_OAUTH2_BACK_END_GOOGLE_URL

    function GoogleLogin() {        
        window.location.href = GOOGLE_API_URL;
        // notify parent first 
        if (onClick) { onClick(); }
    }
    return (

        <button className="btn btn-light border d-flex align-items-center gap-2 w-100 w-md-auto glow-btn" onClick={GoogleLogin}>
            <img
                src={socialLogin}
                alt="Google"
                style={{ width: "20px", height: "20px" }}
            />


        </button>
    );
}

export default GoogleButton;

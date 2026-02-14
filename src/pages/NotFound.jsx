import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="card shadow p-1">
      <div className="card-body">
        <h1>404</h1>
        <h3 className="card-title text-center mb-4">Page Not Found</h3>
        <p>The page you are looking for doesn’t exist.</p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

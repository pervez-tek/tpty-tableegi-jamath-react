import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // 🚫 Not logged in → redirect to login/welcome
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → show the protected page
  return children;
};

export default ProtectedRoute;

import { useEffect, useState } from 'react'

import Header from "./components/Header";
import Footer from "./components/Footer";
import SurveyPage from "./pages/SurveyPage";

import './App.css'
import Navbar from './components/Navbar';
import { AuthProvider } from "./components/auth/AuthContext"; // ✅ correct path
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./components/auth/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    document.title = import.meta.env.VITE_REACT_APP_TITLE || "Default Title";
    const autoLogout = sessionStorage.getItem("autoLogout");

    if (autoLogout === "true") {
      toast.warning("You were logged out automatically");
      sessionStorage.removeItem("autoLogout");
    }
  }, []);



  useEffect(() => {
    const handleUnload = () => {

      //console.log("Befor Unload calling" + JSON.stringify(user));
      const payload =
        JSON.parse(sessionStorage.getItem("user") || "{}");
      //console.log("Test:" + JSON.stringify(JSON.parse(sessionStorage.getItem("user"))));
      //console.log("Befor Unload calling" + JSON.stringify(payload));
      if (!payload || !payload.usrAdminId) return;

      const blob = new Blob(
        [JSON.stringify(payload)],
        { type: "application/json" }
      );
      console.log("Befor Unload calling" + JSON.stringify(blob));
      navigator.sendBeacon(`${API_URL}/signOut`, blob);
      sessionStorage.removeItem("user");  
      sessionStorage.setItem("autoLogout", "true");
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [user]);



  return (
    <>

      <ToastContainer position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        limit={1}
        pauseOnHover />
      <AuthProvider>
        <Navbar />
        <SurveyPage />
        <Footer />
      </AuthProvider>

    </>
  )
}

export default App

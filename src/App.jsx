import { useEffect, useState } from 'react'

import Header from "./components/Header";
import Footer from "./components/Footer";
import SurveyPage from "./pages/SurveyPage";

import './App.css'
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import About from './components/About';
import SurveyForm from './components/SurveyForm';
import { AuthProvider } from "./components/auth/AuthContext"; // ✅ correct path
import { ToastContainer } from "react-toastify"; import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => { document.title = import.meta.env.VITE_REACT_APP_TITLE || "Default Title"; }, []);

  useEffect(() => {
    const handleUnload = () => {
      navigator.sendBeacon("http://localhost:5000/api/cleanup");
      // sendBeacon is better for unload events
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);


  return (
    <>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover />
      <AuthProvider>
        <Navbar />
        <SurveyPage />
        <Footer />
      </AuthProvider>

    </>
  )
}

export default App

import React, { useState } from "react";
import { useAuth } from "./auth/AuthContext";
// ✅ import
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Admin = () => {
  // State to capture form values
  const [form, setForm] = useState({
    username: "",
    password: "",
    id: "",
    sessionid: ""
  });

  const API_URL = import.meta.env.VITE_BACKEND_URL;


  const [errorMessage, setErrorMessage] = useState("");

  const { login, userLoginInfo } = useAuth();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("URL:" + API_URL);
    axios.post(`${API_URL}/signIn`, form, { withCredentials: true })
      .then(response => {
        setErrorMessage(""); // clear error on success

        // after successful signIn
        const user = {
          id: response.data.id,
          username: response.data.username,
          sessionid: response.data.sessionid
        };
        login(user); // from useAuth
        navigate("/addMasjid", { state: { loginData: user } });


      })
      .catch(error => {
        console.error("Error:", error.response?.data || error.message);
        const backendMessage = error.response?.data?.message || error.message;
        setErrorMessage(backendMessage);
        toast.error(backendMessage);
      });

  };

  // Handle reset
  const handleReset = () => {
    setForm({ username: "", password: "" });
  };

  return (
    <div className="card shadow">
      <div className="card-body">
        <h4 className="card-title text-center mb-4">Login</h4>
        {/* Show error message if exists */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <form className="was-validated" onSubmit={handleSubmit} method="post">

          <div className="form-floating mb-3 mt-3">
            <input
              className="form-control"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              required
            />
            <label className="form-label">Username</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"   // 👈 use password type instead of email
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
            <label className="form-label">Password</label>
          </div>

          <div className="d-grid gap-3">
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;

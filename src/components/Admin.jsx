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
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const { login, userLoginInfo } = useAuth();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    if (loading) return; // guard
    e.preventDefault();
    setLoading(true);
    console.log("URL:" + API_URL);
    await axios.post(`${API_URL}/signIn`, form, { withCredentials: true })
      .then(response => {
        setErrorMessage(""); // clear error on success

        // after successful signIn
        console.log(response.data);
        const user = {
          id: response.data.id,
          username: response.data.username,
          sessionid: response.data.sessionid,
          isAdminLogin: response.data.isAdminLogin,
          usrAdminId: response.data.usrAdminId
        };
        login(user); // from useAuth
        navigate("/addMasjid", { state: { loginData: user } });
        toast.success("Login Success");
        console.log("After Successful Login" + JSON.stringify(user));
      })
      .catch(error => {
        if (error.code === "ERR_NETWORK") {
          console.error("Error fetching masjids:", error);
          // Custom handling for network errors
          //showNotification("⚠️ Network error, showing dummy authentication instead!", "warning");

          if (form.username === "admin" && form.password === "admin") {
            const user = {
              id: "response.data.id",
              username: "response.data.username",
              sessionid: "response.data.sessionid",
              isAdminLogin: "response.data.isAdminLogin",
              usrAdminId: "response.data.usrAdminId"
            };
            login(user); // from useAuth
            navigate("/addMasjid", { state: { loginData: user } });
            toast.warning("⚠️ Network error, showing dummy authentication instead!");
          } else {
            console.error("Error:", error.response?.data || error.message);
            const backendMessage = error.response?.data?.message || error.message;
            toast.error(`❌ Error: ${backendMessage}`);
            navigate("/login");
          }

        } else {
          // Other errors (e.g. 400/500 from backend)
          // showNotification(`❌ Error: ${error.response?.data || error.message}`, "danger");
          console.error("Error:", error.response?.data || error.message);
          const backendMessage = error.response?.data?.message || error.message;
          toast.error(`❌ Error: ${backendMessage}`);
          navigate("/login");
        }


      });
    setLoading(false);
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
              type="password"   // 👈 use password type instead of email
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
              {loading ? "Logging in..." : "Login"}
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

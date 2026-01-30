
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./auth/AuthContext";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BroadcastMessage = () => {

    const API_URL = import.meta.env.VITE_BACKEND_URL;


    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const navLoginData = location.state?.loginData;
    // after Login from Admin capturing user login information
    // Try sessionStorage fallback (optional) setEditIndex 
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("user") : null;
    const persisted = stored ? JSON.parse(stored) : null;
    const initialLogin = navLoginData ?? persisted ?? { adminUsrTrackingId: "", username: "", sessionid: null, usrAdminId: "" };

    const navigate = useNavigate();

    const api = axios.create({ baseURL: API_URL });
    const { user, isLoggedIn, logout } = useAuth();

    const [form, setForm] = useState(() => (
        {
            id: "", subject: 0, message: "",
            adminUsrTrackingId: initialLogin.id ?? "", username: initialLogin.username ?? "", sessionid: initialLogin.sessionid ?? null,
            usrAdminId: initialLogin.usrAdminId ?? null
        }));


    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                // session expired → redirect to login
                //window.location.href = "/login";
                // or use 
                logout();
                navigate("/login"); //if inside a React component
                console.log("Session expired=" + JSON.stringify(error.response));
                toast.warning("Session expired. redirect to login.");
                localStorage.clear();
                sessionStorage.clear();
            }
            return Promise.reject(error);
        }
    );

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {       
        e.preventDefault();
                 
        const payload = {
            ...form,
            adminUsrTrackingId: initialLogin.id,
            username: initialLogin.username,
            sessionid: initialLogin.sessionid,
            usrAdminId: initialLogin.usrAdminId
        };
        console.log("Form:" + JSON.stringify(payload));


        // console.log("Update=" + JSON.stringify(form));
        api.post(`${API_URL}/broadCastMessage`, payload, {
            headers: {
                sessionid: initialLogin.sessionid ?? "",
                id: initialLogin.id ?? "", username: initialLogin.username ?? "",
                usrAdminId: initialLogin.usrAdminId ?? null
            },
            withCredentials: true
        })
            .then(response => {
                console.log("Response: from updateMasjid API = " + JSON.stringify(response.data));
                toast.success("Message posted completed.");
            })
            .catch(error => {
                console.error("Error:", error.response?.data || error.message);
                if (error.code === "ERR_NETWORK") {

                    toast.error("Network error, Please contact Admin.");
                }

            });

        
        handleReset();
    };

    const handleReset = () => {
        setForm({
            id: "", subject: 0, message: "",
            adminUsrTrackingId: initialLogin.id ?? "", username: initialLogin.username ?? "", sessionid: initialLogin.sessionid ?? null,
            usrAdminId: initialLogin.usrAdminId ?? null
        });

    };

    return (
        <div className="card shadow">
            <div className="card-body">
                <h4 className="card-title text-center mb-4">
                    Post Message
                </h4>

                <input type="hidden" value={form.adminUsrTrackingId || ""} name="adminUsrTrackingId" />
                <input type="hidden" value={initialLogin.username || ""} name="username" />
                <input type="hidden" value={initialLogin.usrAdminId || ""} name="usrAdminId" />
                <input type="hidden" value={initialLogin.sessionid || ""} name="sessionid" />

                <form className="was-validated" onSubmit={handleSubmit}>


                    <div className="form-floating mb-3 mt-3">
                        <input
                            type="text"
                            className="form-control"
                            name="subject"
                            value={form.subject || ""}
                            onChange={handleChange}
                            placeholder="Enter Subject"
                            required
                        />
                        <label className="form-label">Subject</label>
                    </div>
                    <div className="form-floating mb-3 mt-3">
                        <textarea className="form-control" name="message"
                            rows={5}
                            placeholder="Message goes here" onChange={handleChange}
                            style={{ height: "150px", resize: "vertical" }} // 👈 force height
                            value={form.message} required
                            maxLength={300}
                        // Aslamwalikum Dear Brothers & Sisters,

                        //Today Jode is organized on Markaz masjid sharp at 10.00 AM please attend without fail.

                        //Jazakhalla
                        />

                        <label className="form-check-label" htmlFor="comment">Message</label>
                        <div className={300 - form.message.length < 20 ? "text-danger" : "form-text"}>
                            {300 - form.message.length} characters remaining
                        </div>
                    </div>


                    <div className="d-grid gap-3">
                        <button type="submit" className="btn btn-primary w-100">
                          Send Message
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
    )
}

export default BroadcastMessage
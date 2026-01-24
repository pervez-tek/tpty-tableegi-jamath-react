import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { initialMasjidsList, addDummyMasjid, updateDummyMasjid, deleteDummyMasjid } from "./dummyMasjidsData";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddMasjid = () => {
    const halka = [
        { id: 1, name: "Halka-1" },
        { id: 2, name: "Halka-2" },
        { id: 3, name: "Halka-3" },
        { id: 4, name: "Halka-4" },
        { id: 5, name: "Halka-5" },
        { id: 0, name: "N/A" }
    ];
    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const [masjids, setMasjids] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const navLoginData = location.state?.loginData;
    // after Login from Admin capturing user login information
    // Try sessionStorage fallback (optional) 
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("user") : null;
    const persisted = stored ? JSON.parse(stored) : null;
    const initialLogin = navLoginData ?? persisted ?? { adminUsrTrackingId: "", username: "", sessionid: null, usrAdminId: "" };

    const navigate = useNavigate();

    const api = axios.create({ baseURL: API_URL });

    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                // session expired → redirect to login
                //window.location.href = "/login";
                // or use 
                navigate("/login"); //if inside a React component
                console.log("Session expired=" + JSON.stringify(error.response));
                toast.warning(`${error.response}`);
            }
            return Promise.reject(error);
        }
    );




    useEffect(() => { // Call backend GET API using axios
        api.get(`${API_URL}/getAllMasjids`, {
            headers: {
                sessionid: initialLogin.sessionid ?? "",
                id: initialLogin.id ?? "", username: initialLogin.username ?? "",
                usrAdminId: initialLogin.usrAdminId ?? null
            },
            withCredentials: true
        }).then((response) => {
            // console.log("Response: from getAllMasjids API =:" + JSON.stringify(response.data));
            setMasjids(response.data);
            setError("");
            // Axios auto-parses JSON 
        }).catch((error) => {
            console.error("Error fetching masjids:", error);
            if (error.code === "ERR_NETWORK") {
                // Custom handling for network errors
                showNotification("⚠️ Network error, showing dummy data instead!", "warning");
                setMasjids(initialMasjidsList);
                setError("");
            } else {
                // Other errors (e.g. 400/500 from backend)
                const backendMessage = error.response?.data?.message || error.message;
                showNotification(`❌ Error: ${backendMessage}`, "danger");
                //setError(`${error.response?.data || error.message} Unable to fetch data.`);
                setMasjids(initialMasjidsList);
                setError("");
            }
        }).finally(() => setLoading(false));

    }, []);


    const [form, setForm] = useState(() => (
        {
            id: "", halkaNo: 0, masjidName: "", address: "",
            adminUsrTrackingId: initialLogin.id ?? "", username: initialLogin.username ?? "", sessionid: initialLogin.sessionid ?? null,
            usrAdminId: initialLogin.usrAdminId ?? null
        }));




    const [editIndex, setEditIndex] = useState(null);

    // Notification state 
    const [notification, setNotification] = useState({ show: false, message: "", variant: "success" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    const showNotification = (message, variant = "success") => {
        setNotification({ show: true, message, variant });
        setTimeout(() => {
            setNotification({ show: false, message: "", variant: "success" });
        }, 5000); // auto-hide after 5s
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
        if (editIndex !== null) {
            // Update existing masjid
            const updatedMasjids = [...masjids];

            setEditIndex(null);

            // console.log("Update=" + JSON.stringify(form));
            api.put(`${API_URL}/updateMasjid`, form, {
                headers: {
                    sessionid: initialLogin.sessionid ?? "",
                    id: initialLogin.id ?? "", username: initialLogin.username ?? "",
                    usrAdminId: initialLogin.usrAdminId ?? null
                },
                withCredentials: true
            })
                .then(response => {
                    console.log("Response: from updateMasjid API = " + JSON.stringify(response.data));

                    const updatedMasjids = [...masjids];
                    updatedMasjids[editIndex] = response.data;
                    setMasjids(updatedMasjids);


                    showNotification(`✅ Masjid updated successfully by ${initialLogin.username}!`, "info");
                })
                .catch(error => {
                    console.error("Error:", error.response?.data || error.message);
                    if (error.code === "ERR_NETWORK") {
                        setMasjids(updateDummyMasjid(masjids, form));
                        showNotification("⚠️ Network error, updated locally!", "warning");
                    }

                });
        } else {
            // Add new masjid
            //  setMasjids([...masjids, form]);

            //console.log("Add=" + JSON.stringify(form));
            api.post(`${API_URL}/addMasjid`, payload, {
                headers: {
                    sessionid: initialLogin.sessionid ?? "",
                    id: initialLogin.id ?? "", username: initialLogin.username ?? "",
                    usrAdminId: initialLogin.usrAdminId ?? null
                },
                withCredentials: true
            })
                .then(response => {
                    console.log("Response: from addMasjid API = " + JSON.stringify(response.data));
                    setMasjids([...masjids, response.data]);
                    showNotification(`✅ Masjid added successfully by ${initialLogin.username}!`, "success");
                })
                .catch(error => {
                    console.error("Error:", error.response?.data || error.message);
                    if (error.code === "ERR_NETWORK") {
                        setMasjids(addDummyMasjid(masjids, form));
                        showNotification("⚠️ Network error, added locally!", "warning");
                    }
                });
        }

        handleReset();
    };

    const handleReset = () => {
        setEditIndex(null);
        setForm({
            id: "", halkaNo: 0, address: "", masjidName: "",
            adminUsrTrackingId: initialLogin.id ?? "", username: initialLogin.username ?? "", sessionid: initialLogin.sessionid ?? null,
            usrAdminId: initialLogin.usrAdminId ?? null
        });

    };

    const handleDelete = (index) => {
        const deletedMasjid = masjids[index];   // capture the entity being deleted
        const updatedMasjids = masjids.filter((_, i) => i !== index);

        //console.log("Delete:" + JSON.stringify(deletedMasjid));

        try {
            // Call API delete with the deleted entity
            api.delete(`${API_URL}/deleteMasjid`, {
                data: deletedMasjid,   // axios.delete requires { data: ... } for body
                headers: {
                    sessionid: initialLogin.sessionid ?? "",
                    id: initialLogin.id ?? "", username: initialLogin.username ?? "",
                    usrAdminId: initialLogin.usrAdminId ?? null
                },
                withCredentials: true
            })
                .then(() => {
                    setMasjids(updatedMasjids);
                    showNotification(`🗑️ Masjid deleted successfully by ${initialLogin.username}!`, "danger");
                })
                .catch(error => {
                    if (error.code === "ERR_NETWORK") {
                        setMasjids(deleteDummyMasjid(masjids, index));
                        showNotification("⚠️ Network error, deleted locally!", "warning");
                    }
                });
        } catch (err) {
            console.error(err);
        }

        handleReset();
        console.log("Delete end");
    };


    const handleEdit = (index) => {
        console.log("Edited 1=" + JSON.stringify(form));
        setForm({
            ...masjids[index],
            adminUsrTrackingId: initialLogin.id,
            username: initialLogin.username,
            sessionid: initialLogin.sessionid,
            usrAdminId: initialLogin.usrAdminId
        });
        setEditIndex(index);

        // Scroll to top smoothly 
        window.scrollTo({ top: 0, behavior: "smooth" });
        console.log("Edited 2=" + JSON.stringify(form));
    };

    return (
        <>
            <div className="card shadow">
                <div className="card-body">
                    <h4 className="card-title text-center mb-4">
                        {editIndex !== null ? "Edit Masjid" : "Add Masjid"}
                    </h4>

                    <input type="hidden" value={form.adminUsrTrackingId || ""} name="adminUsrTrackingId" />
                    <input type="hidden" value={initialLogin.username || ""} name="username" />
                    <input type="hidden" value={initialLogin.usrAdminId || ""} name="usrAdminId" />
                    <input type="hidden" value={initialLogin.sessionid || ""} name="sessionid" />

                    <form className="was-validated" onSubmit={handleSubmit}>
                        <input type="hidden" value={form.id || ""} name="id" />
                        <div className="form-floating mb-3 mt-3">
                            <select
                                className="form-select"
                                id="halkaNo"
                                name="halkaNo"
                                value={form.halkaNo ?? ""}
                                onChange={(e) => setForm(prev => ({ ...prev, halkaNo: Number(e.target.value) }))}
                                required
                            >
                                <option value="">-- Select Halqa --</option>
                                {halka.map((data) => (
                                    <option value={data.id} key={data.id}>
                                        {data.name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="halqa" className="form-label">
                                Halqa (1–5)
                            </label>
                        </div>

                        <div className="form-floating mb-3 mt-3">
                            <input
                                type="text"
                                className="form-control"
                                name="masjidName"
                                value={form.masjidName || ""}
                                onChange={handleChange}
                                placeholder="Enter Masjid"
                                required
                            />
                            <label className="form-label">Name</label>
                        </div>

                        <div className="form-floating mb-3 mt-3">
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={form.address || ""}
                                onChange={handleChange}
                                placeholder="Enter Address"
                                required
                            />
                            <label className="form-label">Address</label>
                        </div>

                        <div className="d-grid gap-3">
                            <button type="submit" className="btn btn-primary w-100">
                                {editIndex !== null ? "Update Masjid" : "Add Masjid"}
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
            {notification.show && (
                <Alert variant={notification.variant} onClose={() => setNotification({ show: false })}
                    dismissible
                >
                    {notification.message}
                </Alert>
            )}
            <hr />

            <h4 className="card-title text-center mb-4">Masjid List</h4>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-warning">
                        <tr>
                            <th>Halka No.</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {error && !loading && (
                            <tr>
                                <td colSpan="4" className="text-center text-danger fw-bold">
                                    {error}
                                </td>
                            </tr>
                        )}
                        {!loading && !error && masjids.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center text-muted">
                                    No records found
                                </td>
                            </tr>
                        )}
                        {!loading && !error && masjids.map((data, index) => (
                            <tr key={index} onClick={() => handleEdit(index)} className="cursor-pointer">
                                <td>{data.halkaNo}</td>
                                <td>{data.masjidName}</td>
                                <td>{data.address}</td>
                                <td>
                                    {/* <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        title="Edit"
                                        onClick={() => handleEdit(index)}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </button> */}
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        title="Delete"
                                        onClick={(e) => {
                                            e.stopPropagation(); // prevent triggering row's onClick
                                            handleDelete(index);
                                        }}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    );
};

export default AddMasjid;

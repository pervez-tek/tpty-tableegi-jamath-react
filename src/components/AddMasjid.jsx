import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const initialMasjidsList = [
    { id: "", halkaNo: "1", masjidName: "Masjid-e-Quba", address: "Hyderabad, Telangana" },
    { id: "", halkaNo: "2", masjidName: "Masjid Noor", address: "Tirupati, Andhra Pradesh" },
    { id: "", halkaNo: "3", masjidName: "Masjid-e-Bilal", address: "Bengaluru, Karnataka" },
    { id: "", halkaNo: "4", masjidName: "Masjid-e-Madina", address: "Chennai, Tamil Nadu" },
    { id: "", halkaNo: "5", masjidName: "Masjid-e-Rehmat", address: "Mumbai, Maharashtra" }
];

const AddMasjid = () => {
    const halka = [
        { id: 1, name: "Halka-1" },
        { id: 2, name: "Halka-2" },
        { id: 3, name: "Halka-3" },
        { id: 4, name: "Halka-4" },
        { id: 5, name: "Halka-5" }
    ];
    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const [masjids, setMasjids] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => { // Call backend GET API using axios
        axios.get(`${API_URL}/getAllMasjids`, { withCredentials: true }).then((response) => {
            console.log("Datar:" + JSON.stringify(response.data));
            setMasjids(response.data);
            setError("");
            // Axios auto-parses JSON 
        }).catch((error) => {
            console.error("Error fetching masjids:", error);
            setError("Network error. Unable to fetch data.");
            setMasjids([]);
        }).finally(() => setLoading(false));

    }, []);

    const location = useLocation();
    const navLoginData = location.state?.loginData;
    // Try sessionStorage fallback (optional) 
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("user") : null;
    const persisted = stored ? JSON.parse(stored) : null; const initialLogin = navLoginData ?? persisted ?? { id: "", username: "", sessionid: null };
    const [form, setForm] = useState(() => (
        {
            id: "", halkaNo: "", masjidName: "", address: "",
            userId: initialLogin.id ?? "", username: initialLogin.username ?? "", sessionid: initialLogin.sessionid ?? null
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
        console.log("Form:" + JSON.stringify(form));
        if (editIndex !== null) {
            // Update existing masjid
            const updatedMasjids = [...masjids];

            setEditIndex(null);
            showNotification("✅ Masjid updated successfully!", "info");
            axios.put(`${API_URL}/updateMasjid`, form)
                .then(response => {
                    console.log("Response:" + JSON.stringify(response.data));
                    //setMasjids([...masjids, response.data]);
                    updatedMasjids[editIndex] = response.data;
                    setMasjids(updatedMasjids);
                })
                .catch(error => {
                    console.error("Error:", error.response?.data || error.message);

                });
        } else {
            // Add new masjid
            setMasjids([...masjids, form]);
            showNotification("✅ Masjid added successfully!", "success");

            axios.post(`${API_URL}/addMasjid`, form)
                .then(response => {
                    console.log("Response:" + JSON.stringify(response.data));
                    setMasjids([...masjids, response.data]);
                })
                .catch(error => {
                    console.error("Error:", error.response?.data || error.message);

                });
        }

        handleReset();
    };

    const handleReset = () => {
        setForm({ id: "", halkaNo: "", address: "", masjidName: "" });
        setEditIndex(null);
    };

    const handleDelete = (index) => {
        const updatedMasjids = masjids.filter((_, i) => i !== index);
        setMasjids(updatedMasjids);
        handleReset();
        showNotification("🗑️ Masjid deleted successfully!", "danger");
    };

    const handleEdit = (index) => {
        setForm(masjids[index]);
        setEditIndex(index);

        // Scroll to top smoothly 
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <div className="card shadow">
                <div className="card-body">
                    <h4 className="card-title text-center mb-4">
                        {editIndex !== null ? "Edit Masjid" : "Add Masjid"}
                    </h4>

                    <input type="hidden" value={form.userId || ""} name="userId" />
                    <input type="hidden" value={form.sessionid || ""} name="sessionid" />
                    <form className="was-validated" onSubmit={handleSubmit}>
                        <input type="hidden" value={form.id || ""} name="id" />
                        <div className="form-floating mb-3 mt-3">
                            <select
                                className="form-select"
                                id="halkaNo"
                                name="halkaNo"
                                value={form.halkaNo || ""}
                                onChange={handleChange}
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
                    <thead className="table-success">
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
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        title="Edit"
                                        onClick={() => handleEdit(index)}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        title="Delete"
                                        onClick={() => handleDelete(index)}
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

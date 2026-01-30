
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import StarRating from "./StarRating";

const FeedBack = () => {

    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState(() => (
        {
            id: "", name: "", email: "", feedBack: "", rating: 4
        }));




    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {
        if (loading) return; // guard
        e.preventDefault();
        setLoading(true);
        console.log("Form:" + JSON.stringify(form));
        // console.log("Update=" + JSON.stringify(form));
        axios.post(`${API_URL}/sendFeedBack`, form, {

            withCredentials: true
        })
            .then(response => {
                console.log("Response: from updateMasjid API = " + JSON.stringify(response.data));
                toast.success("Feeback sent completed. Thanks for the FeedBack.");
            })
            .catch(error => {
                console.error("Error:", error.response?.data || error.message);
                if (error.code === "ERR_NETWORK") {

                    toast.error("Network error, Please contact Admin!");
                }

            });

        setLoading(false);
        handleReset();
    };


    const handleReset = () => {
        setForm({
            id: "", name: "", email: "", feedBack: "", rating: 4
        });

    };

    return (
        <div className="card shadow">
            <div className="card-body">
                <h4 className="card-title text-center mb-4">
                    FeedBack Form
                </h4>

                <form className="was-validated" onSubmit={handleSubmit}>


                    <div className="form-floating mb-3 mt-3">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={form.name || ""}
                            onChange={handleChange}
                            placeholder="Enter Name"
                            required
                        />
                        <label className="form-label">Name</label>
                    </div>
                    <div className="form-floating mb-3 mt-3">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={form.email || ""}
                            pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                            onChange={handleChange}
                            placeholder="Enter Email"
                            required
                        />
                        <label className="form-label">Email</label>
                    </div>
                    <div className="form-floating mb-3 mt-3">
                        <textarea className="form-control" name="feedBack"
                            rows={5}
                            placeholder="Message goes here" onChange={handleChange}
                            style={{ height: "150px", resize: "vertical" }} // 👈 force height
                            value={form.feedBack} required
                            maxLength={300}
                        // Aslamwalikum Dear Brothers & Sisters,

                        //Today Jode is organized on Markaz masjid sharp at 10.00 AM please attend without fail.

                        //Jazakhalla
                        />

                        <label className="form-check-label" htmlFor="feedBack">FeedBack</label>
                        <div className={300 - form.feedBack.length < 20 ? "text-danger" : "form-text"}>
                            {300 - form.feedBack.length} characters remaining
                        </div>

                    </div>


                    <div className="form-floating mb-3 mt-3">
                        <StarRating
                            totalStars={5}
                            size={30}
                            color="#ff5733"
                            name="rating"
                            value={form.rating}
                            onRate={handleChange}
                        />
                        <div className="mt-2">
                            {form.rating > 0 && <span className="badge bg-info">You rated {form.rating} stars</span>}
                        </div>
                    </div>



                    <div className="d-grid gap-3">
                        <button type="submit" className="btn btn-primary w-100">
                            {loading ? "Sending FeedBack..." : "Send FeedBack"}
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

export default FeedBack;
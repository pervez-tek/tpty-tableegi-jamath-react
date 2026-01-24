import { useEffect, useState } from "react";
import JamathCheckboxes from "../services/JamathCheckboxes";
import FiveAamalCheckboxes from "../services/FiveAamalCheckboxes";
import HalkaMasjidDropDown from "../services/HalkaMasjidDropDown";
import axios from "axios";
import GoogleButton from "./GoogleButton";
import { toast } from "react-toastify";
import Man from "../assets/images/avt_man.jpg";
import Wom from "../assets/images/avt_wom.jpg";

import "./surveyForm.css";

const SurveyForm = () => {
    const [form, setForm] = useState({
        id: "",
        image: "",
        name: "",
        email: "",
        service: "",
        phone: "",
        age: "",
        masjidId: "", // dropdown 
        jamath: [], // checkboxes group 
        _5aamal: [], // checkboxes group
        comment: "",
        agreeTerms: "",
        picture: ""
    });

    const APP_HEADING = import.meta.env.VITE_APP_HEADING;
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const ROOT_API_URL = import.meta.env.VITE_BACKEND_ROOT_URL;

    const [add, setAdd] = useState(true);


    useEffect(() => {

        axios
            .get(`${API_URL}/googleUser`, { withCredentials: true })
            .then(res => {
                console.log("Response:", JSON.stringify(res.data));
                setForm(prev => ({
                    ...prev,
                    name: res.data.name || "",
                    email: res.data.email || "",
                    image: res.data.image || "",
                    picture: res.data.picture || ""
                }));
            })
            .catch(err => {
                // user not logged in – ignore
                // console.error("Error occurred:", err);
                //toast.error("Please Contact Admin");
            }).finally(); // reset trigger

    }, []); // ✅ dependency array goes here

    const handleGoogleClick = () => {
        console.log("Google button clicked, notify parent here"); // you can set state, show a toast, etc.     
    };

    useEffect(() => {
        if (form.email) {
            axios.post(`${API_URL}/getJamathiDetails`, form, {
                withCredentials: true
            })
                .then(res => {
                    console.log("After G Siginin" + JSON.stringify(res.data));
                    if (res.data && res.data.email) {
                        setForm(prev => ({
                            ...prev,
                            service: res.data.service || "",
                            image: res.data.image || "",
                            name: res.data.name || "",
                            id: res.data.id || "",
                            age: res.data.age || "",
                            phone: res.data.phone || "",
                            masjidId: res.data.masjidId || "",
                            jamath: res.data.jamath || "",
                            _5aamal: res.data._5aamal || "",
                            comment: res.data.comment || "",
                            agreeTerms: res.data.agreeTerms || "",
                            picture: res.data.picture || "",
                        }));
                        setAdd(false);
                    }
                })
                .catch(err => {
                    setAdd(true);
                    console.error(err);
                    toast.error("Please Contact Admin");
                });
        }
    }, [form.email]);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitSurvey = async (e) => {
        e.preventDefault();
        console.log(form)


        axios.post(`${API_URL}/submitSurveyJamath`, form, { withCredentials: true })
            .then(response => {
                console.log("Response:" + JSON.stringify(response.data));

            })
            .catch(error => {
                console.error("Error:", error.response?.data || error.message);
                toast.error("Please Contact Admin");
            });

        if (add) {
            toast.success("Survey submitted successfully!");
        } else {
            toast.success("Survey updated successfully!");
        }
        handleReset();
        setAdd(true);
    };

    const handleReset = () => {
        setForm({
            id: "",
            image: "",
            name: "",
            email: "",
            service: "",
            phone: "",
            age: "",
            masjidId: "", // dropdown 
            jamath: [], // checkboxes group 
            _5aamal: [], // checkboxes group
            comment: "",
            agreeTerms: "",
            picture: ""
        });
        setAdd(true);
    };

    return (
        <div className="card shadow">
            <div className="card-body">
                <div className="table-responsive">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h4 className="card-title text-center mb-4">
                                        {APP_HEADING}
                                    </h4>
                                </td>
                                <td>
                                    <GoogleButton onClick={handleGoogleClick} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="text-center mb-3">
                                        <img
                                            //src={`${ROOT_API_URL}${form.image}`}
                                            src={form.image ? `${ROOT_API_URL}${form.image}` : Man}
                                            alt="Profile"
                                            className="rounded-circle"
                                            width="50px" height="50px"
                                        />
                                        {/* <img
                                            //src={`${ROOT_API_URL}${form.picture}`}
                                            src={form.picture ? `${ROOT_API_URL}${form.picture}` : Wom}
                                            alt="Profile"
                                            className="rounded-circle"
                                            width="50px" height="50px"
                                        /> */}
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>

                <form onSubmit={submitSurvey} className="was-validated">
                    <div className="form-floating mb-3 mt-3">
                        <input type="email" className="form-control" value={form.email} name="email" onChange={handleChange} placeholder="Enter email" required />
                        <label className="form-label">Email</label>
                    </div>

                    <div className="form-floating mb-3 mt-3">
                        <input className="form-control" name="name" onChange={handleChange} placeholder="Enter name" value={form.name} required />
                        <label className="form-label">Name</label>
                    </div>

                    <div className="form-floating mb-3 mt-3">
                        <input type="name" className="form-control" value={form.service} name="service" onChange={handleChange} placeholder="Enter Service" required />
                        <label className="form-label">Profession/Busineess/Student</label>
                    </div>

                    <div className="form-floating mb-3 mt-3">
                        <input type="tel" pattern="[0-9]{10}" className="form-control" maxLength="10" name="phone"
                            value={form.phone}
                            //onChange={handleChange} 
                            onChange={(e) => setForm({ ...form, phone: Number(e.target.value) }) // 👈 convert to number 
                            }
                            placeholder="Enter phone"
                            required />
                        <label className="form-label">Phone 10 Digits (0-9)</label>
                    </div>

                    <div className="form-floating mb-3 mt-3">
                        <input className="form-control" name="age" type="number" min="12" max="75"
                            value={form.age}
                            onChange={(e) => setForm({ ...form, age: Number(e.target.value) }) // 👈 convert to number 
                            }
                            required />
                        <label className="form-label">Age</label>
                    </div>
                    <HalkaMasjidDropDown value={form.masjidId} onChange={(e) => setForm({ ...form, masjidId: e.target.value })} />
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <td>
                                        <label className="form-label">Jamath</label>
                                    </td>
                                    <td>
                                        <JamathCheckboxes
                                            value={form.jamath} onChange={(selected) => setForm({ ...form, jamath: selected })} />
                                    </td>
                                </tr>

                                <tr>
                                    <td><label className="form-label">5 Aamal </label></td>
                                    <td>
                                        <FiveAamalCheckboxes
                                            value={form._5aamal} onChange={(selected) => setForm({ ...form, _5aamal: selected })} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div className="form-floating">
                        <textarea className="form-control" name="comment" placeholder="Comment goes here" onChange={handleChange}
                            value={form.comment} />
                        <label className="form-check-label" htmlFor="comment">Comments</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="agreeTerms"
                            name="agreeTerms"
                            //onChange={handleChange}
                            onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                            checked={form.agreeTerms}
                            required
                        />
                        <label className="form-check-label" htmlFor="agreeTerms">
                            I agree
                        </label>
                    </div>

                    &nbsp;
                    <div className="d-grid gap-3">
                        <button className="btn btn-primary w-100">
                            {add && add ? "Submit" : "Update"} Survey
                        </button>
                        <button className="btn btn-danger w-100" onClick={handleReset}>
                            Reset
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SurveyForm;

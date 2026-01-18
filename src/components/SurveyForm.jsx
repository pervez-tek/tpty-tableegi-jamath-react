import { useEffect, useState } from "react";
import JamathCheckboxes from "../services/JamathCheckboxes";
import FiveAamalCheckboxes from "../services/FiveAamalCheckboxes";
import HalkaMasjidDropDown from "../services/HalkaMasjidDropDown";
import axios from "axios";



const SurveyForm = () => {
    const [form, setForm] = useState({
        id: "",
        image: "",
        name: "",
        email: "",
        service: "",
        phone: 0,
        age: 0,
        masjidId: "", // dropdown 
        jamath: [], // checkboxes group 
        _5aamal: [], // checkboxes group
        comment: "",
        agree: ""
    });

    const APP_HEADING = import.meta.env.VITE_APP_HEADING;
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const GOOGLE_API_URL = import.meta.env.VITE_OAUTH2_BACK_END_GOOGLE_URL

    function GoogleLogin() {
        window.location.href = GOOGLE_API_URL;
    }

    useEffect(() => {
        axios.get(`${API_URL}/user`, { withCredentials: true })
            .then(res => {
                console.log("Response:" + JSON.stringify(res.data));
                setForm(prev => ({
                    ...prev,
                    name: res.data.name || "",
                    email: res.data.email || "",
                    image: res.data.picture || ""
                }));


            })
            .catch(() => {
                // user not logged in – ignore
                console.error("Error occured")
            });

        axios.get(`${API_URL}/getJamathiDetails`, form, { withCredentials: true })
            .then(res => {
                console.log("Response:" + JSON.stringify(res.data));

            })
            .catch(() => {
                // user not logged in – ignore
                console.error("Error occured")
            });

    }, []);



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

            });

        alert("Survey submitted successfully!");
        handleReset();
    };

    const handleReset = () => {
        setForm({
            id: "",
            image: "",
            name: "",
            email: "",
            service: "",
            phone: 0,
            age: 0,
            masjidId: "", // dropdown 
            jamath: [], // checkboxes group 
            _5aamal: [], // checkboxes group
            comment: "",
            agree: ""
        });
    };

    return (
        <div className="card shadow">
            <div className="card-body">
                <table className="table table-hover">
                    <tbody>
                        <tr>
                            <td>
                                <h4 className="card-title text-center mb-4">
                                    {APP_HEADING}
                                </h4>
                            </td>
                            <td>
                                <button
                                    className="btn btn-light border d-flex align-items-center gap-2 px-3"
                                    style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }}
                                    onClick={GoogleLogin}>
                                    <img
                                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                        alt="Google"
                                        width="20"
                                    />
                                </button>
                            </td>
                            <td>{form.image && (
                                <div className="text-center mb-3">
                                    <img
                                        src={form.image}
                                        alt="Profile"
                                        className="rounded-circle"
                                        width="80"
                                    />
                                </div>
                            )}
                            </td>
                        </tr></tbody></table>

                <form onSubmit={submitSurvey} className="was-validated">
                    <div className="form-floating mb-3 mt-3">
                        <input className="form-control" name="name" onChange={handleChange} placeholder="Enter name" value={form.name} required />
                        <label className="form-label">Name</label>
                    </div>

                    <div className="form-floating mb-3 mt-3">
                        <input type="email" className="form-control" value={form.email} name="email" onChange={handleChange} placeholder="Enter email" required />
                        <label className="form-label">Email</label>
                    </div>

                    <div className="form-floating mb-3 mt-3">
                        <input type="name" className="form-control" name="service" onChange={handleChange} placeholder="Enter Service" required />
                        <label className="form-label">Profession/Busineess/Student</label>
                    </div>

                    <div className="form-floating mb-3 mt-3">
                        <input type="tel" pattern="[0-9]{10}" className="form-control" maxLength="10" name="phone"
                            //onChange={handleChange} 
                            onChange={(e) => setForm({ ...form, phone: Number(e.target.value) }) // 👈 convert to number 
                            }
                            placeholder="Enter phone"
                            required />
                        <label className="form-label">Phone 10 Digits (0-9)</label>
                    </div>

                    <div className="form-floating mb-3 mt-3">
                        <input className="form-control" name="age" type="number" min="12" max="75"
                            onChange={(e) => setForm({ ...form, age: Number(e.target.value) }) // 👈 convert to number 
                            }
                            required />
                        <label className="form-label">Age</label>
                    </div>
                    <HalkaMasjidDropDown value={form.masjidId} onChange={(e) => setForm({ ...form, masjidId: e.target.value })} />
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


                    <div className="form-floating">
                        <textarea className="form-control" name="comment" placeholder="Comment goes here" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="comment">Comments</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="agree"
                            name="agree"
                            //onChange={handleChange}
                            onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                            checked={form.agree}
                            required
                        />
                        <label className="form-check-label" htmlFor="agree">
                            I agree
                        </label>
                    </div>

                    &nbsp;
                    <div className="d-grid gap-3">
                        <button className="btn btn-primary w-100">
                            Submit Survey
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

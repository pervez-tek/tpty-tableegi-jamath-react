import { Route, Routes } from "react-router";
import Admin from "../components/Admin";
import SurveyForm from "../components/SurveyForm";
import About from "../components/About";
import Contact from "../components/Contact";
import AddMasjid from "../components/AddMasjid";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { useEffect } from "react";
import "./surveyPage.css";
import Reports from "../components/Reports";
import ListOfMasjids from "../components/ListOfMasjids";

import Kalima from "../assets/images/bismillah.png";

function SurveyPage() {


    return (
        <>
            <div className="container mt-3 pt-5" >
                <div className="profile-image">
                    <img
                        src={Kalima}
                        alt="profile"
                        height="50px"
                        width="300px"
                    />
                </div>
                <div className="row justify-content-center custom-row">
                    <div className="col-12 col-sm-12 col-md-10 col-lg-9 col-xl-8 mx-4">
                        <Routes>
                            <Route path="/" element={<SurveyForm />} />
                            <Route path="/login" element={<Admin />} />
                            <Route path="/surveyForm" element={<SurveyForm />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/listOfMasjids" element={<ListOfMasjids />} />
                            <Route path="/addMasjid" element={<ProtectedRoute>
                                <AddMasjid />
                            </ProtectedRoute>
                            }
                            />
                            <Route path="/reports" element={<ProtectedRoute>
                                <Reports />
                            </ProtectedRoute>
                            }
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SurveyPage;

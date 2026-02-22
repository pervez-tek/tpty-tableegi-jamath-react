import { Navigate, Route, Routes } from "react-router";
import React, { lazy, Suspense } from "react";


import { useEffect } from "react";
import "./surveyPage.css";
import Kalima from "../assets/images/bismillah.png";
import NotFound from "./NotFound";

const Admin = React.lazy(() => import("../components/Admin"));
// Lazy imports
const SurveyForm = lazy(() => import("../components/SurveyForm"));
const About = lazy(() => import("../components/About"));
const Contact = lazy(() => import("../components/Contact"));
const ProtectedRoute = lazy(() => import("../components/auth/ProtectedRoute"));
const Reports = lazy(() => import("../components/Reports"));
const BroadcastMessage = lazy(() => import("../components/BroadcastMessage"));

const FeedBack = lazy(() => import("../components/FeedBack"));
const NamazTimings = lazy(() => import("../components/NamazTimings"));
const QiblaFinder = lazy(() => import("../components/QiblaFinder"));
const LoginForm = lazy(() => import("../components/LoginForm"));
const AddMasjid = lazy(() => import("../components/AddMasjid"));
const ListOfMasjids = lazy(() => import("../components/ListOfMasjids"));


// import About from "../components/About";
// import Contact from "../components/Contact";
// import AddMasjid from "../components/AddMasjid_bkp";
// import ProtectedRoute from "../components/auth/ProtectedRoute";
// import Reports from "../components/Reports";
// import ListOfMasjids from "../components/ListOfMasjids_bkp";

// 
// import BroadcastMessage from "../components/BroadcastMessage";
// import FeedBack from "../components/FeedBack";
// import LoginForm from "../components/LoginForm";


const Loader = () => <div className="text-center mt-5">Loading...</div>;

function SurveyPage({ menuOpen }) {
    return (
        <>
            <div className={`page-content ${menuOpen ? "shift-down" : ""}`}>
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
                        <div className="col-12 col-sm-12 col-md-12 col-lg-11 col-xl-8 mx-4">
                            <Suspense fallback={<Loader />}>

                                <Routes>
                                    <Route path="/" element={<Navigate to="/surveyForm" replace />} />
                                    <Route path="/login" element={<Admin />} />
                                    <Route path="/surveyForm" element={<SurveyForm />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/listOfMasjids" element={<ListOfMasjids />} />
                                    <Route path="/feedBack" element={<FeedBack />} />
                                    <Route path="/namazTimings" element={<NamazTimings />} />
                                    <Route path="/qiblaFinder" element={<QiblaFinder />} />
                                    <Route path="/loginForm" element={<LoginForm />} />
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
                                    <Route path="/broadCastMessage" element={<ProtectedRoute>
                                        <BroadcastMessage />
                                    </ProtectedRoute>
                                    }
                                    />
                                    {/* 404 – MUST BE LAST */}
                                    <Route path="*" element={<NotFound />} />
                                </Routes>

                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SurveyPage;

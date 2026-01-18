import { Route, Routes } from "react-router";
import Admin from "../components/Admin";
import SurveyForm from "../components/SurveyForm";
import About from "../components/About";
import Contact from "../components/Contact";
import AddMasjid from "../components/AddMasjid";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { useEffect } from "react";




function SurveyPage() {
   

    return (<div className="container mt-5 pt-5" >
        <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-10 col-lg-9 col-xl-8">
                <Routes>
                    <Route path="/" element={<SurveyForm />} />
                    <Route path="/login" element={<Admin />} />
                    <Route path="/surveyForm" element={<SurveyForm />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/addMasjid" element={<ProtectedRoute>
                        <AddMasjid />
                    </ProtectedRoute>
                    }
                    />
                </Routes>
            </div>
        </div>
    </div>
    )
}

export default SurveyPage;

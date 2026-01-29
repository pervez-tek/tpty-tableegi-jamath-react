import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./reports.css"
import ProfileCard from "./ProfileCard";
import Man from "../assets/images/avt_man.jpg";
import Wom from "../assets/images/avt_wom.jpg";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./auth/AuthContext";
import { usePagination } from './pagination/usePagination';
import PaginationControls from './pagination/PaginationControls';

function Reports() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [results, setResults] = useState(null);

  const ROOT_API_URL = import.meta.env.VITE_BACKEND_ROOT_URL;
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [jamathi, setJamathi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const location = useLocation();
  const navLoginData = location.state?.loginData;
  // after Login from Admin capturing user login information
  // Try sessionStorage fallback (optional) 
  const stored = typeof window !== "undefined" ? sessionStorage.getItem("user") : null;
  const persisted = stored ? JSON.parse(stored) : null;
  const initialLogin = navLoginData ?? persisted ?? { adminUsrTrackingId: "", username: "", sessionid: null, usrAdminId: "" };

  const navigate = useNavigate();

  const api = axios.create({ baseURL: API_URL });
  const { user, isLoggedIn, logout } = useAuth();

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

  const dummyProfiles = Array.from({ length: 100 }, (_, i) => ({
    name: i % 2 === 0 ? "Ahmed Khan" : "Sana Khan",
    masjidName: "Masjid-e-Quba",
    halkaNo: i % 2 === 0 ? 1 : 2,
    phone: "+91 9876543210",
    profession: "Engineer",
    email: "ahmed@example.com",
    comments: "Active volunteer in community programs.",
    //image: i % 2 === 0 ? Man : Wom
  }));



  const handleSubmit = (e) => {
    e.preventDefault();


    setLoading(true); // 🔵 start loading

    api.get(`${API_URL}/betweenJamathDates`, {
      headers: {
        sessionid: initialLogin.sessionid ?? "",
        id: initialLogin.id ?? "", username: initialLogin.username ?? "",
        usrAdminId: initialLogin.usrAdminId ?? null
      },
      withCredentials: true,
      params: {
        fromDate: fromDate, // "2026-01-20"
        toDate: toDate      // "2026-01-25"
      }
    }).then((response) => {
      console.log("Response: from getAllMasjids API =:" + JSON.stringify(response.data));
      setJamathi(response.data);
      // Example: calculate dummy count between dates
      const count = response.data.length; //Math.floor(Math.random() * 10) + 1; // fake count
      setResults({ count, fromDate, toDate });

      // Axios auto-parses JSON 
    }).catch((error) => {
      console.error("Error fetching masjids:", error);
      if (error.code === "ERR_NETWORK") {
        // Custom handling for network errors
        toast.warning("⚠️ Network error, showing dummy data instead!");
        setJamathi(dummyProfiles);
        const count = dummyProfiles.length; //Math.floor(Math.random() * 10) + 1; // fake count
        setResults({ count, fromDate, toDate });

      } else {
        // Other errors (e.g. 400/500 from backend)
        const backendMessage = error.response?.data?.message || error.message;
        toast.error(`❌ Error: ${backendMessage}`);
        //setError(`${error.response?.data || error.message} Unable to fetch data.`);
        setJamathi(dummyProfiles);
        const count = dummyProfiles.length; //Math.floor(Math.random() * 10) + 1; // fake count
        setResults({ count, fromDate, toDate });

      }
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    if (toDate && fromDate && toDate < fromDate) {
      setToDate("");
    }
  }, [fromDate, toDate]);


  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setResults(null);
    setShowResults(prev => !prev)
  };

  // usePagination returns pageItems, pageSize, currentPage, etc.
  const {
    pageItems,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    totalItems,
    totalPages
  } = usePagination(jamathi, 5);

  // Reset to first page when the data set changes (prevents empty page)
  useEffect(() => {
    setCurrentPage(1);
  }, [jamathi, setCurrentPage]);

  return (
    <>
      <div className="card shadow p-1">
        <div className="card-body">
          <h4 className="card-title text-center mb-4">Reports</h4>

          {/* Date range form */}
          <form onSubmit={handleSubmit} className="row g-3 mb-3">
            <div className="col-md-6">
              <label htmlFor="fromDate" className="form-label">From Date</label>
              <input
                type="date"
                id="fromDate"
                className="form-control"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setToDate(""); // reset toDate when fromDate changes
                }}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="toDate" className="form-label">To Date</label>
              <input
                type="date"
                id="toDate"
                className="form-control"
                value={toDate}
                min={fromDate || undefined}   // ⭐ KEY LINE
                onChange={(e) => setToDate(e.target.value)}
                disabled={!fromDate}          // optional but recommended
                required
              />
            </div>


            <div className="col-12 d-flex justify-content-center mt-3">


              <button
                type="submit"
                className="btn btn-primary me-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Loading...
                  </>
                ) : (
                  "Submit"
                )}
              </button>

              <button type="button" className="btn btn-secondary" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>

          {/* Results section */}
          {results && (
            <div className="mt-4 text-center">
              <h5>Results</h5>
              <p><strong>Count:</strong> {results.count}</p>
              <p>
                <strong>From:</strong> {results.fromDate} <br />
                <strong>To:</strong> {results.toDate}
              </p>
              <button
                className="btn btn-outline-info"
                onClick={() => setShowResults(prev => !prev)}
              >
                {showResults ? "Hide Results" : "View Results"}
              </button>

            </div>
          )}
        </div>
      </div>

      {showResults && (
        <>
          <hr />
          <h4 className="card-title text-center mb-4">Generated Data</h4>

          <div className="card shadow p-0">
            <div className="card-body">
              <div className="table-responsive">
                <div className="d-flex align-items-center mb-0">
                  <select
                    className="form-select form-select-sm me-3"
                    style={{ width: 60, height: 30 }}
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <div className="ms-auto d-flex align-items-center">

                    <PaginationControls
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onChange={setCurrentPage}
                    />
                  </div>
                </div>
                {pageItems.length === 0 ? (
                  <p className="text-center text-muted">
                    No records found
                  </p>
                ) : (
                  pageItems.map((user, index) => (
                    <ProfileCard
                      key={index}
                      user={{
                        name: user.name,
                        masjidName: user.masjidName,
                        halkaNo: user.halkaNo,
                        phone: `+91 ${user.phone}`,
                        profession: user.service,
                        email: user.email,
                        comments: user.comments || user.comment,
                        image: user.image
                          ? user.image
                          : user.gender === 'M'
                            ? Man
                            : Wom
                      }}
                    />
                  ))
                )}

              </div>
              {/* Bottom controls (outside table) */}
              <div className="d-flex mt-2">
                <div className="ms-auto">
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onChange={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </>
  );
}

export default Reports;

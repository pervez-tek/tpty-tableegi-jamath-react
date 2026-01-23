import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./reports.css"
import ProfileCard from "./ProfileCard";
import Man from "../assets/images/avt_man.jpg";
import Wom from "../assets/images/avt_wom.jpg";

function Reports() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [results, setResults] = useState(null);

  const ROOT_API_URL = import.meta.env.VITE_BACKEND_ROOT_URL;



  const handleSubmit = (e) => {
    e.preventDefault();

    // Example: calculate dummy count between dates
    const count = Math.floor(Math.random() * 10) + 1; // fake count
    setResults({ count, fromDate, toDate });
  };

  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setResults(null);
  };

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
                onChange={(e) => setFromDate(e.target.value)}
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
                onChange={(e) => setToDate(e.target.value)}
                required
              />
            </div>

            <div className="col-12 d-flex justify-content-center mt-3">
              <button type="submit" className="btn btn-primary me-2">
                Submit
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
              <button className="btn btn-outline-info">View Results</button> &nbsp;&nbsp;
              <button className="btn btn-outline-info">Hide Results</button>
            </div>
          )}
        </div>
      </div>

      <hr />
      <h4 className="card-title text-center mb-4">Generated Data</h4>
      <div className="card shadow p-0">
        <div className="card-body">
          <div className="table-responsive">
            <ProfileCard
              user={{
                name: "Ahmed Khan",
                masjidName: "Masjid-e-Quba",
                phone: "+91 9876543210",
                profession: "Engineer",
                email: "ahmed@example.com",
                comments: "Active volunteer in community programs.",
                image: Man//ROOT_API_URL+"/profiles/avt_man.jpg"
              }}
            />

            <ProfileCard
              user={{
                name: "Sana Khan",
                masjidName: "Masjid-e-Quba",
                phone: "+91 9876543210",
                profession: "Engineer",
                email: "ahmed@example.com",
                comments: "Active volunteer in community programs.",
                image: Wom //ROOT_API_URL+"/profiles/avt_man.jpg"
              }}

            />

            <ProfileCard
              user={{
                name: "Ahmed Khan",
                masjidName: "Masjid-e-Quba",
                phone: "+91 9876543210",
                profession: "Engineer",
                email: "ahmed@example.com",
                comments: "Active volunteer in community programs.",
                image: Man//ROOT_API_URL+"/profiles/avt_man.jpg"
              }}
            />

            <ProfileCard
              user={{
                name: "Sana Khan",
                masjidName: "Masjid-e-Quba",
                phone: "+91 9876543210",
                profession: "Engineer",
                email: "ahmed@example.com",
                comments: "Active volunteer in community programs.",
                image: Wom //ROOT_API_URL+"/profiles/avt_man.jpg"
              }}

            />

            <ProfileCard
              user={{
                name: "Ahmed Khan",
                masjidName: "Masjid-e-Quba",
                phone: "+91 9876543210",
                profession: "Engineer",
                email: "ahmed@example.com",
                comments: "Active volunteer in community programs.",
                image: Man//ROOT_API_URL+"/profiles/avt_man.jpg"
              }}
            />

            <ProfileCard
              user={{
                name: "Sana Khan",
                masjidName: "Masjid-e-Quba",
                phone: "+91 9876543210",
                profession: "Engineer",
                email: "ahmed@example.com",
                comments: "Active volunteer in community programs.",
                image: Wom //ROOT_API_URL+"/profiles/avt_man.jpg"
              }}

            />


          </div>
        </div>
      </div >
    </>
  );
}

export default Reports;

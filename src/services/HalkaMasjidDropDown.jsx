import axios from "axios";
import React, { useState, useEffect } from "react";
//import { initialMasjidsList1 } from "../components/dummyMasjidsData";
import { toast } from "react-toastify";


// dummyMasjidsData.js
export const initialMasjidsList = {
  1: [
    { id: "TG-001", masjidName: "Masjid-e-Quba (Telangana)" },
    { id: "AP-001", masjidName: "Masjid Noor (Andhra Pradesh)" },
    { id: "KA-001", masjidName: "Masjid-e-Bilal (Karnataka)" },
    { id: "MH-001", masjidName: "Masjid-e-Rehmat (Maharashtra)" }
  ],

  2: [
    { id: "TN-001", masjidName: "Masjid-e-Madina (Tamil Nadu)" },
    { id: "KL-001", masjidName: "Masjid-e-Noorani (Kerala)" },
    { id: "GJ-001", masjidName: "Masjid-e-Huda (Gujarat)" }
  ],

  3: [
    { id: "UP-001", masjidName: "Masjid-e-Ali (Uttar Pradesh)" },
    { id: "RJ-001", masjidName: "Masjid-e-Umar (Rajasthan)" },
    { id: "MP-001", masjidName: "Masjid-e-Kausar (Madhya Pradesh)" }
  ],

  4: [
    { id: "WB-001", masjidName: "Masjid-e-Nur (West Bengal)" },
    { id: "BR-001", masjidName: "Masjid-e-Taqwa (Bihar)" },
    { id: "JH-001", masjidName: "Masjid-e-Siddiq (Jharkhand)" }
  ],

  5: [
    { id: "PB-001", masjidName: "Masjid-e-Farooq (Punjab)" },
    { id: "HR-001", masjidName: "Masjid-e-Anwar (Haryana)" },
    { id: "DL-001", masjidName: "Masjid-e-Aqsa (Delhi)" }
  ],

  0: [
    { id: "GEN-001", masjidName: "General Masjid (No Halka)" },
    { id: "GEN-002", masjidName: "Common Area Masjid" }
  ]
};





const API_URL = import.meta.env.VITE_BACKEND_URL;

function HalkaMasjidDropDown({ value, onChange }) {

  const [halkaMasjids, setHalkaMasjids] = useState([]);

  useEffect(() => { // Fetch data when component mounts 
    axios.get(`${API_URL}/getHalkaWiseAllMasjids`, { withCredentials: true }) // your API endpoint 
      .then((response) => {
        // console.log("Welcome" + JSON.stringify(response.data));
        setHalkaMasjids(response.data); // assuming response.data is an array 
      }).catch((error) => {
        console.error("Error fetching data:", error);
        setHalkaMasjids(initialMasjidsList);

        if (error.code === "ERR_NETWORK") {
          console.error("Error fetching masjids:", error);
          toast.warning("⚠️ Network error, showing dummy authentication instead!");
        } else {
          // Other errors (e.g. 400/500 from backend)
          // showNotification(`❌ Error: ${error.response?.data || error.message}`, "danger");
          console.error("Error:", error.response?.data || error.message);
          const backendMessage = error.response?.data?.message || error.message;
          toast.error(`❌ Error: ${backendMessage}`);
        }

      });

  }, []);

  return (
    <div className="form-floating mb-3 mt-3">
      <select
        className="form-select"
        id="masjid"
        name="masjid"
        value={value}              // 👈 controlled by parent
        onChange={onChange}        // 👈 parent handler
        required
      >
        <option value="">-- Select Masjid --</option> {/* 👈 placeholder */}
        {Object.entries(halkaMasjids)
          // sort keys: numeric ascending, but push 0 to the end
          .sort(([a], [b]) => {
            if (Number(a) === 0) return 1;   // push "0" after others
            if (Number(b) === 0) return -1;
            return Number(a) - Number(b);    // normal numeric sort
          })
          .map(([halkaNo, masjids]) =>
            Number(halkaNo) > 0 ? (
              // ✅ For other halkaNo values, render with optgroup label
              <optgroup key={halkaNo} label={`HalkaNo - ${halkaNo}`}>
                {masjids.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.masjidName}
                  </option>
                ))}
              </optgroup>
            ) : (
              // ✅ For halkaNo = 0, render options directly (no label)
              masjids.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.masjidName}
                </option>
              ))
            )
          )}



      </select>
      <label htmlFor="masjid" className="form-label">HalkaNo (1–5)</label>
    </div>
  );
}

export default HalkaMasjidDropDown;

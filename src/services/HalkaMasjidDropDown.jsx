import axios from "axios";
import React, { useState, useEffect } from "react";


const halkaMasjids1 = [
  {
    label: "Halka 1",
    options: [
      { value: "AP", text: "Andhra Pradesh (AP)" },
      { value: "TG", text: "Telangana (TG)" },
      { value: "KA", text: "Karnataka (KA)" }
    ]
  },
  {
    label: "Halka 2",
    options: [
      { value: "Doha", text: "Doha" },
      { value: "Riyadh", text: "Riyadh" }
    ]
  }
];



const API_URL = import.meta.env.VITE_BACKEND_URL;

function HalkaMasjidDropDown({ value, onChange }) {

  const [halkaMasjids, setHalkaMasjids] = useState([]);

  useEffect(() => { // Fetch data when component mounts 
    axios.get(`${API_URL}/getHalkaWiseAllMasjids`, { withCredentials: true }) // your API endpoint 
      .then((response) => {
        // console.log("Welcome" + JSON.stringify(response.data));
        setHalkaMasjids(response.data); // assuming response.data is an array 
      }).catch((error) => { console.error("Error fetching data:", error); });
       
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
        {Object.entries(halkaMasjids).map(([halkaNo, masjids]) => (
          <optgroup key={halkaNo} label={`HalkaNo - ${halkaNo}`}>
            {masjids.map((m) => (
              <option key={m.id} value={m.id}>
                {m.masjidName}
              </option>
            ))}
          </optgroup>
        ))}
        <option value="others">Others</option>
      </select>
      <label htmlFor="masjid" className="form-label">HalkaNo (1–5)</label>
    </div>
  );
}

export default HalkaMasjidDropDown;

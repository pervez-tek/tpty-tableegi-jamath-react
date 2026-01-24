import React, { useEffect, useState } from 'react'
import { initialMasjidsList } from "./dummyMasjidsData";
import { toast } from "react-toastify";
import axios from 'axios';

const ListOfMasjids = () => {

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const [loading, setLoading] = useState(false);
    const [masjids, setMasjids] = useState([]);


    useEffect(() => { // Call backend GET API using axios
        axios.get(`${API_URL}/getAllMasjids`, {
            withCredentials: true
        }).then((response) => {
            // console.log("Response: from getAllMasjids API =:" + JSON.stringify(response.data));
            setMasjids(response.data);
            
            // Axios auto-parses JSON 
        }).catch((error) => {
            console.error("Error fetching masjids:", error);
            if (error.code === "ERR_NETWORK") {
                // Custom handling for network errors
                toast.warning("⚠️ Network error, showing dummy data instead!");
                setMasjids(initialMasjidsList);
                
            } else {
                // Other errors (e.g. 400/500 from backend)
                const backendMessage = error.response?.data?.message || error.message;
                toast.error(`❌ Error: ${backendMessage}`);
                //setError(`${error.response?.data || error.message} Unable to fetch data.`);
                setMasjids(initialMasjidsList);
                
            }
        }).finally(() => setLoading(false));

    }, []);

    return (
        <div className="card shadow p-0">
            <div className="card-body">
                <h4 className="card-title text-center mb-4">ListOfMasjids</h4>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-warning">
                            <tr>
                                <th>Halka No.</th>
                                <th>Name</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                            )}

                            {!loading && masjids.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center text-muted">
                                        No records found
                                    </td>
                                </tr>
                            )}
                            {!loading && masjids.map((data, index) => (
                                <tr key={index} className="cursor-pointer">
                                    <td>{data.halkaNo}</td>
                                    <td>{data.masjidName}</td>
                                    <td>{data.address}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default ListOfMasjids
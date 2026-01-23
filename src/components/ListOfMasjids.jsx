import React, { useState } from 'react'
import { initialMasjidsList } from "./dummyMasjidsData";

const ListOfMasjids = () => {

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const [loading, setLoading] = useState(false);
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

                            {!loading && initialMasjidsList.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center text-muted">
                                        No records found
                                    </td>
                                </tr>
                            )}
                            {!loading && initialMasjidsList.map((data, index) => (
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
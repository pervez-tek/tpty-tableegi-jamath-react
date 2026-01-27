import React, { useEffect, useState } from 'react';
import { initialMasjidsList, hugeMasjidsList } from "./dummyMasjidsData";
import { toast } from "react-toastify";
import axios from 'axios';
import { usePagination } from './pagination/usePagination';
import PaginationControls from './pagination/PaginationControls';

const ListOfMasjids = () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const [loading, setLoading] = useState(true);
    const [masjids, setMasjids] = useState([]);

    const showToast = (message, type = "info") => {
        toast.dismiss();
        toast[type](message, {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: true,
            draggable: true,
        });
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        setLoading(true);

        axios.get(`${API_URL}/getAllMasjids`, {
            withCredentials: true,
            cancelToken: source.token
        })
            .then((response) => {
                // remove the extra setLoading(true) here
                const data = response.data;
                // adapt if backend returns wrapper or array
                const items = Array.isArray(data) ? data : (Array.isArray(data.items) ? data.items : []);
                setMasjids(items);
            })
            .catch((error) => {
                console.error("Error fetching masjids:", error);
                if (error.code === "ERR_NETWORK") {
                    showToast("⚠️ Network error, showing dummy data instead!", "warning");
                    setMasjids(hugeMasjidsList);
                } else {
                    const backendMessage = error.response?.data?.message || error.message;
                    showToast(`❌ Error: ${backendMessage}`, "error");
                    setMasjids(hugeMasjidsList);
                }
            })
            .finally(() => setLoading(false));

        return () => source.cancel();
    }, [API_URL]);

    // usePagination returns pageItems, pageSize, currentPage, etc.
    const {
        pageItems,
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage,
        totalItems,
        totalPages
    } = usePagination(masjids, 5);

    // Reset to first page when the data set changes (prevents empty page)
    useEffect(() => {
        setCurrentPage(1);
    }, [masjids, setCurrentPage]);


    return (
        <div className="card shadow p-0">
            <div className="card-body">
                <h4 className="card-title text-center mb-4">ListOfMasjids</h4>
                <div className="table-responsive">
                    {/* Controls outside the table */}
                    
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
                    <table className="table table-hover">
                        <thead className="table-warning">
                            <tr>
                                <th>No.</th>
                                <th>Halka No.</th>
                                <th>Name</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan="4" className="text-center">Loading...</td>
                                </tr>
                            )}

                            {!loading && pageItems.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center text-muted">No records found</td>
                                </tr>
                            )}

                            {/* IMPORTANT: render pageItems (not masjids) */}
                            {!loading && pageItems.map((data, idx) => (
                                <tr key={data.id ?? `${data.halkaNo}-${idx}`} className="cursor-pointer">
                                    <td>{(currentPage - 1) * pageSize + idx + 1}</td>
                                    <td>{data.halkaNo}</td>
                                    <td>{data.masjidName}</td>
                                    <td>{data.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
    );
};

export default ListOfMasjids;

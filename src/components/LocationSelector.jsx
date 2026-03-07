import React, { useState, useRef, useEffect } from "react";
import { ImLocation2 } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { setCity } from "../redux/locationSlice";
import { fetchNamazTimings } from "../redux/locationSlice";
import "./LocationSelector.css";
import { useLocation } from "react-router";
import { locations } from "./dummyLocationsData";
import { toast } from "react-toastify";
import axios from 'axios';

const LocationSelector = ({ payload }) => {

    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const dispatch = useDispatch();
    const selectedCity = useSelector((state) => state.location.selectedCity);

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();

    // const allowedRoutes = [
    //     "/surveyForm",
    //     "/about", "contact", "listOfMasjids"
    // ];

    // 🔹 Make readonly when SuperAdmin is FALSE
    const isReadOnly = payload?.isSuperAdmin === false && payload?.username;

    const [cities, setCities] = useState([]);

    useEffect(() => {
        if (!payload?.isSuperAdmin && payload?.locationId && cities.length > 0) {

            const selected = cities.find(
                (city) => String(city.id) === String(payload.locationId)
            );

            if (selected) {
                dispatch(setCity(selected));
                dispatch(fetchNamazTimings(selected));
            }
        }
    }, [cities, payload, dispatch]);


    useEffect(() => {
        const source = axios.CancelToken.source();


        axios.get(`${API_URL}/getAllLocations`, {
            withCredentials: true,
            cancelToken: source.token
        })
            .then((response) => {
                // remove the extra setLoading(true) here
                const data = response.data;
                // adapt if backend returns wrapper or array
                const items = Array.isArray(data) ? data : (Array.isArray(data.items) ? data.items : []);
                setCities(items);
            })
            .catch((error) => {
                console.error("Error fetching masjids:", error);
                if (error.code === "ERR_NETWORK") {
                    showToast("⚠️ Network error, showing dummy data instead!", "warning");
                    setCities(locations);
                } else {
                    const backendMessage = error.response?.data?.message || error.message;
                    showToast(`❌ Error: ${backendMessage}`, "error");
                    setCities(locations);
                }
            })
            .finally(() => { });

        return () => source.cancel();
    }, [API_URL]);

    useEffect(() => {
        dispatch(fetchNamazTimings(selectedCity));
    }, [dispatch, selectedCity]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            className="me-auto d-flex align-items-center"
            ref={dropdownRef}
            
            onClick={() => {
                if (!isReadOnly) {
                    setIsOpen(!isOpen);
                }
            }}
        >
            <ImLocation2 className="location-icon glow-icon-warning" />

            <span
                className="fw-semibold glow-icon-warning hoverEffect"
                style={{ cursor: isReadOnly ? "not-allowed" : "pointer", color: '#ffc107' }}
            >
                {selectedCity.name}
                {/* show arrow only when editable */}
                {!isReadOnly && " ▼"}
            </span>

            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%", // 🔥 Always below
                        left: "120px",
                        marginTop: "8px",
                        background: "#98e6b8",
                        borderRadius: "8px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                        padding: "1px",
                        minWidth: "180px",
                        zIndex: 9999, // 🔥 Prevent hiding
                        animation: "fadeIn 0.2s ease-in-out"
                    }}>
                    {cities.map((city) => (
                        <div
                            key={city.id}
                            style={{
                                padding: "8px 10px",
                                cursor: "pointer",
                                borderRadius: "5px"
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.background = "#f8f9fa")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.background = "transparent")
                            }

                            onClick={() => {
                                if (isReadOnly) return;
                                dispatch(setCity(city)); // 🔥 Redux update
                                dispatch(fetchNamazTimings(city)); // 🔥 API call
                                setIsOpen(false);
                            }}
                        >
                            {city.sequenceNo}-{city.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationSelector;
import React, { useState, useRef, useEffect } from "react";
import { ImLocation2 } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { setCity, fetchNamazTimings } from "../redux/locationSlice";
import "./LocationSelector.css";
import { locations } from "./dummyLocationsData";
import axios from "axios";

const LocationSelector = ({ payload }) => {

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const dispatch = useDispatch();
    const selectedCity = useSelector((state) => state.location.selectedCity);

    const [isOpen, setIsOpen] = useState(false);
    const [cities, setCities] = useState([]);

    const dropdownRef = useRef(null);

    // 🔹 Readonly when user is not SuperAdmin
    const isReadOnly = payload?.isSuperAdmin === false;

    // ===============================
    // Fetch Locations
    // ===============================
    useEffect(() => {

        const source = axios.CancelToken.source();

        axios.get(`${API_URL}/getAllLocations`, {
            withCredentials: true,
            cancelToken: source.token
        })
            .then((response) => {

                console.log("Locations API Response:", response.data);

                const data = response.data;

                const items =
                    Array.isArray(data)
                        ? data
                        : Array.isArray(data?.items)
                            ? data.items
                            : [];

                setCities(items);

                // set default selected city
                if (items.length > 0 && !selectedCity) {
                    dispatch(setCity(items[0]));
                }

            })
            .catch((error) => {

                console.error("Error fetching locations:", error);

                // fallback dummy data
                setCities(locations);

            });

        return () => source.cancel();

    }, [API_URL, dispatch]);



    // ===============================
    // Set City for Non Super Admin
    // ===============================
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



    // ===============================
    // Fetch Namaz timings
    // ===============================
    useEffect(() => {

        if (selectedCity) {
            dispatch(fetchNamazTimings(selectedCity));
        }

    }, [dispatch, selectedCity]);



    // ===============================
    // Close dropdown outside click
    // ===============================
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
            style={{ position: "relative" }}
        >

            <ImLocation2 className="location-icon glow-icon-warning" />

            {/* Location Label */}
            <span
                className="fw-semibold glow-icon-warning hoverEffect"
                style={{
                    cursor: isReadOnly ? "not-allowed" : "pointer",
                    color: "#ffc107",
                    marginLeft: "6px"
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!isReadOnly) {
                        setIsOpen(!isOpen);
                    }
                }}
            >
                {selectedCity?.name || "Select Location"}
                {!isReadOnly && " ▼"}
            </span>



            {/* Dropdown */}
            {isOpen && !isReadOnly && (

                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        marginTop: "8px",
                        background: "#98e6b8",
                        borderRadius: "8px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                        padding: "4px",
                        minWidth: "180px",
                        zIndex: 9999
                    }}
                >

                    {Array.isArray(cities) && cities.map((city) => (

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

                                dispatch(setCity(city));
                                dispatch(fetchNamazTimings(city));

                                setIsOpen(false);

                            }}
                        >
                            {city.sequenceNo} - {city.name}
                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default LocationSelector;
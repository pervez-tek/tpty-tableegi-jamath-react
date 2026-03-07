import React, { useState, useRef, useEffect } from "react";
import { ImLocation2 } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { setCity } from "../redux/locationSlice";
import { fetchNamazTimings } from "../redux/locationSlice";
import "./LocationSelector.css";

const LocationSelector = ({payload}) => {

    const dispatch = useDispatch();
    const selectedCity = useSelector((state) => state.location.selectedCity);

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const cities = [

        {
            id: 1,
            name: "Tirupati",
            state: "Andhra Pradesh",
            country: "India",
            lat: 13.6288,
            lon: 79.4192,
            shortName:"tpty",
            halka:5
        },
        {
            id: 2,
            name: "Chittoor",
            state: "Andhra Pradesh",
            country: "India",
            lat: 13.2172,
            lon: 79.1003,
            shortName:"ctr",
            halka:6
        },
        {
            id: 3,
            name: "Srikalahasti",
            state: "Andhra Pradesh",
            country: "India",
            lat: 13.7498,
            lon: 79.6984,
            shortName:"skht",
            halka:4
        },
        {
            id: 4,
            name: "Nellore",
            state: "Andhra Pradesh",
            country: "India",
            lat: 14.4426,
            lon: 79.9865,
            shortName:"nlr",
            halka:7

        },
        {
            id: 5,
            name: "Kadapa",
            state: "Andhra Pradesh",
            country: "India",
            lat: 14.4674,
            lon: 78.8242,
            shortName:"cdp",
            halka:5
        },
        {
            id: 6,
            name: "Amaravati",
            state: "Andhra Pradesh",
            country: "India",
            lat: 16.5417,
            lon: 80.5150,
            shortName:"amv",
            halka:8
        }
    ];


    useEffect(() => {
        dispatch(fetchNamazTimings(selectedCity));
    }, [dispatch]);

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
            onClick={() => setIsOpen(!isOpen)}
        >
            <ImLocation2 className="location-icon glow-icon-warning" />

            <span
                className="fw-semibold glow-icon-warning hoverEffect"
                style={{ cursor: "pointer", color: '#ffc107' }}
            >
                {selectedCity.name} ▼
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
                                dispatch(setCity(city)); // 🔥 Redux update
                                dispatch(fetchNamazTimings(city)); // 🔥 API call
                                setIsOpen(false);
                            }}
                        >
                            {city.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationSelector;
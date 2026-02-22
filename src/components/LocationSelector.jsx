import React, { useState, useRef, useEffect } from "react";
import { ImLocation2 } from "react-icons/im";
import "./LocationSelector.css";

const LocationSelector = () => {
    const [selectedCity, setSelectedCity] = useState("Tirupati");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const cities = [
        "Tirupati",
        "Hyderabad",
        "Chennai",
        "Bangalore",
        "Mumbai",
        "Delhi"
    ];

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
                {selectedCity} ▼
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
                    }}
                >
                    {cities.map((city) => (
                        <div
                            key={city}
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
                                setSelectedCity(city);
                                setIsOpen(false);
                            }}
                        >
                            {city}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationSelector;
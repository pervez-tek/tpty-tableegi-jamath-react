import React, { useState, useEffect } from "react";
import kaaba from "../assets/images/kaaba.png";
import "./QiblaFinder.css";

const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

function QiblaFinder() {
    const [heading, setHeading] = useState(0);
    const [qiblaDirection, setQiblaDirection] = useState(0);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [error, setError] = useState("");

    // Convert degrees to radians
    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;

    // 🔹 Calculate Qibla Bearing
    const calculateQibla = (lat, lon) => {
        const φ1 = toRad(lat);
        const φ2 = toRad(KAABA_LAT);
        const Δλ = toRad(KAABA_LON - lon);

        const y = Math.sin(Δλ) * Math.cos(φ2);
        const x =
            Math.cos(φ1) * Math.sin(φ2) -
            Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

        const θ = Math.atan2(y, x);
        return (toDeg(θ) + 360) % 360;
    };

    // 🔹 Get User Location
    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation not supported.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                const direction = calculateQibla(latitude, longitude);
                setQiblaDirection(direction);
            },
            () => setError("Location permission denied.")
        );
    }, []);

    // 🔹 Handle Device Orientation
    const handleOrientation = (event) => {
        let compassHeading;

        // iOS
        if (event.webkitCompassHeading !== undefined) {
            compassHeading = event.webkitCompassHeading;
        }
        // Android
        else if (event.alpha !== null) {
            compassHeading = 360 - event.alpha;
        }

        if (compassHeading !== undefined) {
            setHeading(compassHeading);
        }
    };

    // 🔹 Request Permission (Important for iOS)
    const requestPermission = async () => {
        if (
            typeof DeviceOrientationEvent !== "undefined" &&
            typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
            try {
                const response = await DeviceOrientationEvent.requestPermission();
                if (response === "granted") {
                    window.addEventListener("deviceorientation", handleOrientation);
                    setPermissionGranted(true);
                }
            } catch {
                setError("Compass permission denied.");
            }
        } else {
            // Android
            window.addEventListener("deviceorientation", handleOrientation);
            setPermissionGranted(true);
        }
    };

    useEffect(() => {
        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
        };
    }, []);

    const rotation = qiblaDirection - heading;

    const isAligned = Math.abs(rotation) < 5;

    return (
        <div className="qibla-container">
            <h3>Qibla Finder</h3>

            {!permissionGranted && (
                <button className="enable-btn" onClick={requestPermission}>
                    Enable Compass
                </button>
            )}

            {error && <p className="error">{error}</p>}

            <div className="compass-wrapper">
                <div
                    className="compass"
                    style={{ transform: `rotate(${-heading}deg)` }}
                >
                    <span className="direction north">N</span>
                    <span className="direction south">S</span>
                    <span className="direction east">E</span>
                    <span className="direction west">W</span>
                </div>

                <img
                    src={kaaba}
                    alt="Kaaba"
                    className={`kaaba ${isAligned ? "aligned" : ""}`}
                    style={{
                        transform: `translate(-50%, -50%) rotate(${rotation}deg)`
                    }}
                    
                />
            </div>

            {isAligned && <p className="aligned-text">✔ Facing Qibla</p>}
        </div>
    );
}

export default QiblaFinder;
import React, { useState, useEffect } from "react";
import kaaba from "../assets/images/makkah.jpg";

function QiblaFinder() {
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [error, setError] = useState("");

  // 🔹 Kaaba coordinates
  const KAABA_LAT = 21.4225;
  const KAABA_LON = 39.8262;

  // 🔹 Calculate Qibla Bearing
  const getQiblaDirection = (lat, lon) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;

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

  // 🔹 Get Location + Qibla Direction
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const direction = getQiblaDirection(latitude, longitude);
        setQiblaDirection(direction);
      },
      () => {
        setError("Location permission denied.");
      }
    );
  }, []);

  // 🔹 Device Orientation (Compass)
  useEffect(() => {
    const handleOrientation = (event) => {
      let compassHeading;

      if (event.webkitCompassHeading) {
        // iOS
        compassHeading = event.webkitCompassHeading;
      } else {
        // Android
        compassHeading = 360 - event.alpha;
      }

      if (compassHeading !== null) {
        setHeading(compassHeading);
      }
    };

    const requestPermission = async () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        } catch (err) {
          setError("Compass permission denied.");
        }
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    requestPermission();

    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  // 🔹 Calculate rotation
  const rotation = qiblaDirection - heading;

  return (
    <div className="compass-container">
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Compass Background */}
      <div
        className="compass"
        style={{
          transform: `rotate(${-heading}deg)`
        }}
      >
        <div className="direction north">N</div>
        <div className="direction south">S</div>
        <div className="direction east">E</div>
        <div className="direction west">W</div>
      </div>

      {/* Kaaba Pointer */}
      <img
        src={kaaba}
        alt="Kaaba"
        className="kaaba"
        style={{
          transform: `rotate(${rotation}deg)`
        }}
      />
    </div>
  );
}

export default QiblaFinder;
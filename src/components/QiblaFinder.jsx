import React, { useState, useEffect, useRef } from "react";
import kaaba from "../assets/images/kaaba.png";
import "./QiblaFinder.css";

const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

function QiblaFinder() {
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const rawHeading = useRef(0);
  const smoothHeading = useRef(0);
  const animationFrame = useRef(null);

  const toRad = (deg) => (deg * Math.PI) / 180;
  const toDeg = (rad) => (rad * 180) / Math.PI;

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

  // Handle compass sensor
  const handleOrientation = (event) => {
    let compassHeading;

    if (event.webkitCompassHeading !== undefined) {
      compassHeading = event.webkitCompassHeading;
    } else if (event.alpha !== null) {
      compassHeading = 360 - event.alpha;
    }

    if (compassHeading !== undefined) {
      rawHeading.current = compassHeading;
    }
  };

  // Smooth animation engine
  useEffect(() => {
    const animate = () => {
      let diff = rawHeading.current - smoothHeading.current;

      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      smoothHeading.current += diff * 0.15; // smoothing factor

      setHeading(smoothHeading.current);

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame.current);
  }, []);

  // Get location + request compass
  useEffect(() => {
    // Get user location
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const direction = calculateQibla(latitude, longitude);
      setQiblaDirection(direction);
    });

    const startCompass = async () => {
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
        } catch (err) {
          console.log("Permission denied");
        }
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
        setPermissionGranted(true);
      }
    };

    // iPhone requires user interaction
    window.addEventListener("click", startCompass, { once: true });

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const rotation = qiblaDirection - heading;
  const isAligned = Math.abs(rotation) < 5;

  return (
    <div className="card shadow">
      <div className="card-body">
        <div className="premium-container">
          <h2>Qibla Finder</h2>

          {!permissionGranted && (
            <p style={{ fontSize: "14px", opacity: 0.7 }}>
              Tap anywhere to activate compass
            </p>
          )}

          <div className="compass-container">
            {/* Compass Dial */}
            <div
              className="compass-dial"
              style={{ transform: `rotate(${-heading}deg)` }}
            >
              <div className="cardinal north">N</div>
              <div className="cardinal south">S</div>
              <div className="cardinal east">E</div>
              <div className="cardinal west">W</div>
            </div>

            {/* Qibla Needle */}
            <div
              className={`needle ${isAligned ? "aligned" : "not-aligned"}`}
              style={{
                transform: `translate(-50%, -100%) rotate(${rotation}deg)`
              }}
            >
              <img src={kaaba} alt="Kaaba" />
            </div>
          </div>

          {isAligned && (
            <p className="aligned-text">✔ You are facing Qibla</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default QiblaFinder;
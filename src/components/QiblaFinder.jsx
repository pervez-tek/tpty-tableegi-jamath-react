import React, { useState, useEffect, useRef } from "react";
import kaaba from "../assets/images/kaaba.png";
import "./QiblaFinder.css";

// 📍 Kaaba coordinates (Makkah)
const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

function QiblaFinder() {

  // -----------------------------
  // STATE VARIABLES
  // -----------------------------
  const [heading, setHeading] = useState(0);           // Current device heading
  const [qiblaDirection, setQiblaDirection] = useState(0); // Calculated Qibla angle
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [stableAligned, setStableAligned] = useState(false); // Prevent flicker

  // -----------------------------
  // REFS (for smooth animation)
  // -----------------------------
  const rawHeading = useRef(0);
  const smoothHeading = useRef(0);
  const animationFrame = useRef(null);

  // -----------------------------
  // DEGREE ↔ RADIAN CONVERSION
  // -----------------------------
  const toRad = (deg) => (deg * Math.PI) / 180;
  const toDeg = (rad) => (rad * 180) / Math.PI;

  // -----------------------------
  // CALCULATE QIBLA DIRECTION
  // -----------------------------
  const calculateQibla = (lat, lon) => {
    const φ1 = toRad(lat);
    const φ2 = toRad(KAABA_LAT);
    const Δλ = toRad(KAABA_LON - lon);

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x =
      Math.cos(φ1) * Math.sin(φ2) -
      Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

    const θ = Math.atan2(y, x);
    return (toDeg(θ) + 360) % 360; // Normalize 0-360
  };

  // -----------------------------
  // HANDLE DEVICE ORIENTATION
  // -----------------------------
  const handleOrientation = (event) => {
    let compassHeading;

    // ✅ iOS (Safari)
    if (event.webkitCompassHeading !== undefined) {
      compassHeading = event.webkitCompassHeading;
    }

    // ✅ Android (Chrome)
    else if (event.absolute === true && event.alpha !== null) {
      compassHeading = event.alpha;
    }

    // Fallback (some Android devices)
    else if (event.alpha !== null) {
      compassHeading = event.alpha;
      const screenOrientation =
        window.screen.orientation?.angle || window.orientation || 0;

      compassHeading = compassHeading + screenOrientation;
    }

    if (compassHeading !== undefined) {
      // Normalize
      rawHeading.current = (360 - compassHeading) % 360;
    }
  };

  // -----------------------------
  // SMOOTH HEADING ANIMATION
  // -----------------------------
  useEffect(() => {
    const animate = () => {
      let diff = rawHeading.current - smoothHeading.current;

      // Fix 360° jump issue
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      // Smooth factor (lower = more stable)
      smoothHeading.current += diff * 0.08;

      setHeading(smoothHeading.current);

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame.current);
  }, []);

  // -----------------------------
  // GET LOCATION + REQUEST PERMISSION
  // -----------------------------
  useEffect(() => {
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
            window.addEventListener("deviceorientationabsolute", handleOrientation, true);
            window.addEventListener("deviceorientation", handleOrientation, true);
            setPermissionGranted(true);
          }
        } catch (err) {
          console.log("Permission denied");
        }
      } else {
        window.addEventListener("deviceorientationabsolute", handleOrientation, true);
        window.addEventListener("deviceorientation", handleOrientation, true);
        setPermissionGranted(true);
      }
    };

    window.addEventListener("click", startCompass, { once: true });

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  // -----------------------------
  // FIX 360° DIFFERENCE PROBLEM
  // -----------------------------
  const getAngleDifference = (a, b) => {
    let diff = a - b;
    diff = ((diff + 540) % 360) - 180; // Normalize -180 to 180
    return diff;
  };

  const rotation = getAngleDifference(qiblaDirection, heading);

  // Alignment tolerance (7° for stability)
  const isAligned = Math.abs(rotation) <= 7;

  // Prevent flicker near threshold
  useEffect(() => {
    if (isAligned) {
      const timer = setTimeout(() => setStableAligned(true), 400);
      return () => clearTimeout(timer);
    } else {
      setStableAligned(false);
    }
  }, [isAligned]);

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="card shadow">
      <div className="card-body">
        <div className="premium-container">

          <h2>Qibla Direction</h2>
          <p>Please calibrate your phone compass before every use for betterresults</p>
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
              className={`needle ${stableAligned ? "aligned" : "not-aligned"}`}
              style={{
                transform: `translate(-50%, -100%) rotate(${rotation}deg)`
              }}
            >
              <img src={kaaba} alt="Kaaba" />
            </div>

          </div>

          {stableAligned && (
            <p className="aligned-text">✔ You are facing Qibla</p>
          )}

        </div>
      </div>
    </div>
  );
}

export default QiblaFinder;
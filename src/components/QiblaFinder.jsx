import React, { useState, useEffect, useRef } from "react";
import kaaba from "../assets/images/kaaba.png";
import "./QiblaFinder.css";


const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

function QiblaFinder() {
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const [distance, setDistance] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

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
    let compassHeading = null;

    // iOS
    if (event.webkitCompassHeading !== undefined) {
      compassHeading = event.webkitCompassHeading;
    }

    // Android absolute event (best)
    else if (event.absolute === true && event.alpha !== null) {
      compassHeading = 360 - event.alpha;
    }

    // Android fallback
    else if (event.alpha !== null) {
      compassHeading = 360 - event.alpha;
    }

    if (compassHeading !== null) {
      const screenAngle =
        window.screen.orientation?.angle || window.orientation || 0;

      compassHeading = (compassHeading + screenAngle) % 360;

      rawHeading.current = compassHeading;
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {

    const R = 6371; // Earth radius km

    const toRad = (deg) => deg * Math.PI / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
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
    navigator.geolocation.getCurrentPosition(
      (pos) => {

        const { latitude, longitude } = pos.coords;

        setUserLocation({ lat: latitude, lon: longitude });

        const qibla = calculateQibla(latitude, longitude);
        setQiblaDirection(qibla);

        const dist = calculateDistance(
          latitude,
          longitude,
          KAABA_LAT,
          KAABA_LON
        );

        setDistance(dist.toFixed(0));

      },
      (err) => console.log(err),
      { enableHighAccuracy: true }
    );

    const startCompass = async () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        try {
          const response = await DeviceOrientationEvent.requestPermission();
          if (response === "granted") {
            if ("ondeviceorientationabsolute" in window) {
              window.addEventListener("deviceorientationabsolute", handleOrientation, true);
            } else {
              window.addEventListener("deviceorientation", handleOrientation, true);
            }
            setPermissionGranted(true);
          }
        } catch (err) {
          console.log("Permission denied");
        }
      } else {
        if ("ondeviceorientationabsolute" in window) {
          window.addEventListener("deviceorientationabsolute", handleOrientation, true);
        } else {
          window.addEventListener("deviceorientation", handleOrientation, true);
        }
        setPermissionGranted(true);
      }
    };

    // iPhone requires user interaction
    window.addEventListener("click", startCompass, { once: true });

    return () => {
      if ("ondeviceorientationabsolute" in window) {
        window.removeEventListener("deviceorientationabsolute", handleOrientation);
      } else {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, []);

  const getAngleDifference = (a, b) => {
    let diff = a - b;
    diff = ((diff + 540) % 360) - 180; // normalize between -180 and 180
    return diff;
  };

  const rotation = getAngleDifference(qiblaDirection, heading);
  const isAligned = Math.abs(rotation) <= 5;

  return (
    <div className="card shadow">
      <div className="card-body">
        <div className="premium-container">
          <h2>Qibla Direction</h2>
          <p style={{ fontSize: "13px", opacity: 0.7 }}>Please calibrate your phone compass before every use for betterresults</p>
          <p style={{ fontSize: "13px", opacity: 0.7 }}>
            Move your phone in a figure-8 motion to calibrate the compass
          </p>

          {distance && (
            <p className="distance-text">
              Distance to Kaaba: <b>{distance} km</b>
            </p>
          )}

          {!permissionGranted && (
            <p style={{ fontSize: "14px", opacity: 0.7 }}>
              Tap anywhere to activate compass
            </p>
          )}
          {isAligned && (
            <p className="aligned-text">✔ You are facing Qibla</p>
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


        </div>
      </div>
    </div>
  );
}

export default QiblaFinder;
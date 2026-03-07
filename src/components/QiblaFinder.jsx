import React, { useEffect, useRef, useState } from "react";
import kaaba from "../assets/images/kaaba.png";
import "./QiblaFinder.css";

const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

export default function QiblaFinder() {

  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [permission, setPermission] = useState(false);

  const rawHeading = useRef(0);
  const smoothHeading = useRef(0);

  const animationFrame = useRef(null);

  const toRad = (deg) => deg * Math.PI / 180;
  const toDeg = (rad) => rad * 180 / Math.PI;

  /* -----------------------------
     QIBLA CALCULATION
  ------------------------------ */

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

  /* -----------------------------
     COMPASS SENSOR
  ------------------------------ */

  const handleOrientation = (event) => {

    let compass = null;

    // iOS Safari
    if (event.webkitCompassHeading !== undefined) {
      compass = event.webkitCompassHeading;
    }

    // Android absolute event
    else if (event.absolute === true && event.alpha !== null) {
      compass = 360 - event.alpha;
    }

    // Android fallback
    else if (event.alpha !== null) {
      compass = 360 - event.alpha;
    }

    if (compass !== null) {

      const screenAngle =
        window.screen.orientation?.angle || window.orientation || 0;

      compass = (compass + screenAngle) % 360;

      rawHeading.current = compass;
    }
  };

  /* -----------------------------
     SMOOTH COMPASS ANIMATION
  ------------------------------ */

  useEffect(() => {

    const animate = () => {

      let diff = rawHeading.current - smoothHeading.current;

      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      smoothHeading.current += diff * 0.12;

      setHeading(smoothHeading.current);

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame.current);

  }, []);

  /* -----------------------------
     LOCATION
  ------------------------------ */

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (pos) => {

        const { latitude, longitude } = pos.coords;

        const qibla = calculateQibla(latitude, longitude);

        setQiblaDirection(qibla);
      },

      (err) => console.log(err),

      { enableHighAccuracy: true }

    );

  }, []);

  /* -----------------------------
     COMPASS START
  ------------------------------ */

  const startCompass = async () => {

    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {

      try {

        const response = await DeviceOrientationEvent.requestPermission();

        if (response === "granted") {

          window.addEventListener(
            "deviceorientationabsolute",
            handleOrientation,
            true
          );

          window.addEventListener(
            "deviceorientation",
            handleOrientation,
            true
          );

          setPermission(true);
        }

      } catch (e) {
        console.log(e);
      }

    } else {

      window.addEventListener(
        "deviceorientationabsolute",
        handleOrientation,
        true
      );

      window.addEventListener(
        "deviceorientation",
        handleOrientation,
        true
      );

      setPermission(true);
    }
  };

  useEffect(() => {

    window.addEventListener("click", startCompass, { once: true });

    return () => {

      window.removeEventListener("deviceorientationabsolute", handleOrientation);

      window.removeEventListener("deviceorientation", handleOrientation);

    };

  }, []);

  /* -----------------------------
     ALIGNMENT CHECK
  ------------------------------ */

  const angleDiff = (a, b) => {

    let diff = a - b;

    diff = ((diff + 540) % 360) - 180;

    return diff;
  };

  const rotation = angleDiff(qiblaDirection, heading);

  const aligned = Math.abs(rotation) < 5;

  /* -----------------------------
     UI
  ------------------------------ */

  return (

    <div className="card shadow">

      <div className="card-body">

        <div className="premium-container">

          <h2>Qibla Direction</h2>

          <p>Move phone in figure 8 motion to calibrate compass</p>

          {!permission && (
            <p style={{ opacity: 0.7 }}>Tap screen to activate compass</p>
          )}

          <div className="compass-container">

            <div
              className="compass-dial"
              style={{ transform: `rotate(${-heading}deg)` }}
            >

              <div className="cardinal north">N</div>
              <div className="cardinal south">S</div>
              <div className="cardinal east">E</div>
              <div className="cardinal west">W</div>

            </div>

            <div
              className={`needle ${aligned ? "aligned" : ""}`}
              style={{
                transform: `translate(-50%, -100%) rotate(${rotation}deg)`
              }}
            >

              <img src={kaaba} alt="Kaaba" />

            </div>

          </div>

          {aligned && <p className="aligned-text">✔ Facing Qibla</p>}

        </div>

      </div>

    </div>

  );
}
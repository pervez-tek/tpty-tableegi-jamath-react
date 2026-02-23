import React, { useEffect, useState } from "react";
import moment from "moment-hijri";
import "./LiveClock.css"
import { ImLocation2 } from "react-icons/im";

function LiveClock() {
    const [time, setTime] = useState(new Date());
    const hijriDate = moment().format("iD iMMMM iYYYY");
    //const hijriDate = moment().format("iD iMMM iYYYY");

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12

        const pad = (num) => num.toString().padStart(2, "0");

        return {
            timeString: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
            ampm,
        };
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        const weekday = date.toLocaleString("en-US", { weekday: "short" });
        const year = date.getFullYear();

        return `${day} ${month}, ${weekday} ${year}`;
    };

    const { timeString, ampm } = formatTime(time);

    return (
        <>
            <div className="clock-container">
                <div className="clock">
                    {timeString}
                    <sub className="ampm"> {ampm}</sub>
                </div>

                <div className="date-container">
                    <div className="date gregorian">
                        <strong>{formatDate(time)}</strong>
                    </div>

                    <div className="date hijri">
                        <strong>{hijriDate}</strong>
                    </div>
                </div>
            </div>
            <div className="location-container">
                <ImLocation2 className="selected-location-icon" />

                <span className="location-text">
                    Tirupathi
                </span>
            </div>
        </>
    );
}

export default LiveClock;

import React, { useState, useEffect } from "react";
import "./NamazCards.css";
import { useSelector } from "react-redux";






function NamazCards() {

    // ✅ Use Redux inside component
    const { selectedCity, timings, loading, error } = useSelector(
        (state) => state.location
    );

    // Convert "05:32" → "05:32 AM"
    const formatTo12Hour = (time24) => {
        const [hour, minute] = time24.split(":");
        const date = new Date();
        date.setHours(hour, minute);

        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };

    function subtractMinutes(timeString, minutesToSubtract) {
        const date = new Date(`1970-01-01T${timeString}`);

        date.setMinutes(date.getMinutes() - minutesToSubtract);

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${hours}:${minutes}`;
    }

    function addMinutes(timeString, minutesToAdd) {
        const date = new Date(`1970-01-01T${timeString}`);

        date.setMinutes(date.getMinutes() + minutesToAdd);

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${hours}:${minutes}`;
    }

    const namazTimings = [
        {
            name: "Fazar",
            timings: {
                "Start": formatTo12Hour(subtractMinutes(timings.Fajr, 13)),
                "Jamaat": "05:45 AM",
                "Ishraaq": formatTo12Hour(addMinutes(timings.Sunrise,20)),
                "Chaasht": formatTo12Hour(addMinutes(timings.Sunrise,183)),
                "Qaza/Sunrise": formatTo12Hour(timings.Sunrise),
            },
        },
        {
            name: "Zohar",
            timings: {
                "Start": formatTo12Hour(timings.Dhuhr),
                "Jamaat": "01:30 PM",
                "Zawaal": formatTo12Hour(subtractMinutes(timings.Dhuhr,5)),
                "Qaza (Hanafi)": formatTo12Hour(timings.Asr),
                "Qaza (Shafai)": formatTo12Hour(subtractMinutes(timings.Asr,64)),
            },
        },
        {
            name: "Asr",
            timings: {
                "Start": formatTo12Hour(timings.Asr),
                "Jamaat": "05:15 PM",
                "Start (Hanafi)": formatTo12Hour(timings.Asr),
                "Start (Shafai)": formatTo12Hour(subtractMinutes(timings.Asr,64)),
                "Qaza": formatTo12Hour(timings.Sunset),
            },
        },
        {
            name: "Maghrib",
            timings: {
                "Start": formatTo12Hour(addMinutes(timings.Maghrib, 3)),
                "Jamaat": formatTo12Hour(addMinutes(timings.Maghrib, 6)),
                "Sunset": formatTo12Hour(timings.Sunset),
                "Iftaar": formatTo12Hour(addMinutes(timings.Maghrib, 3)),
                "Qaza": "07:38 PM",
            },
        },
        {
            name: "Isha",
            timings: {
                "Start": formatTo12Hour(addMinutes(timings.Isha, 13)),
                "Jamaat": "08:30 PM",
                "Tahajjud": "03:13 PM",
                "Sahoor End": formatTo12Hour(subtractMinutes(timings.Fajr,23)),
                "Qaza": formatTo12Hour(subtractMinutes(timings.Fajr, 13)),
            },
        },
        {
            name: "Juma",
            timings: {
                "Khutba": "01:45 PM",
                "Khutba 1": "02:00 PM",
                "Khutba 2": "--:--",
                "Khutba 3": "--:--",
                "Khutba 4": "--:--",
            },
        },
    ];


    const [currentMinutes, setCurrentMinutes] = useState(
        new Date().getHours() * 60 + new Date().getMinutes()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentMinutes(now.getHours() * 60 + now.getMinutes());
        }, 30000); // update every 30 seconds

        return () => clearInterval(interval);
    }, []);


    const getPrayerStatus = (prayerName) => {

        const parseTime = (timeStr) => {
            if (!timeStr || timeStr === "--:--") return null;

            const [time, modifier] = timeStr.split(" ");
            let [hours, minutes] = time.split(":").map(Number);

            if (modifier === "PM" && hours !== 12) hours += 12;
            if (modifier === "AM" && hours === 12) hours = 0;

            return hours * 60 + minutes;
        };

        const today = new Date();
        const isFriday = today.getDay() === 5; // 5 = Friday

        // Build prayer list with start times
        let prayers = namazTimings
            .map(p => ({
                name: p.name,
                start: parseTime(p.timings["Start"])
            }))
            .filter(p => p.start !== null)
            .sort((a, b) => a.start - b.start);

        // 🔥 If Friday → replace Zohar with Juma
        if (isFriday) {
            const juma = namazTimings.find(p => p.name === "Juma");

            if (juma) {
                const khutbaStart = parseTime(juma.timings["Khutba"] || juma.timings["Khutba 1"]);

                if (khutbaStart !== null) {
                    prayers = prayers.map(p =>
                        p.name === "Zohar"
                            ? { name: "Juma", start: khutbaStart }
                            : p
                    );
                }
            }
        }

        // Find active prayer (latest start passed)
        let activePrayer = null;

        for (let i = 0; i < prayers.length; i++) {
            if (currentMinutes >= prayers[i].start) {
                activePrayer = prayers[i].name;
            }
        }

        if (!activePrayer) {
            return prayerName === prayers[0].name ? "next-prayer" : "";
        }

        if (prayerName === activePrayer) return "active-prayer";

        const thisPrayer = prayers.find(p => p.name === prayerName);

        if (thisPrayer && thisPrayer.start > currentMinutes)
            return "next-prayer";

        return "past-prayer";
    };


    return (
        <div className="namaz-container">
            {namazTimings.map((namaz, index) => (
                <div
                    key={index}
                    className={`namaz-card ${getPrayerStatus(namaz.name)}`}
                >
                    <h4 className="namaz-title">{namaz.name}</h4>

                    {Object.entries(namaz.timings).map(([label, time], i) => (
                        <div key={i} className="row-item">
                            <span className="label">{label}</span>
                            <span className="time">
                                {time && time !== "--:--" ? time.replace(" AM", "").replace(" PM", "") : time}
                            </span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default NamazCards;
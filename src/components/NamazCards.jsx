
import React, { useState, useEffect } from "react";
import "./NamazCards.css";

const namazTimings = [
    {
        name: "Fazar",
        timings: {
            "Start": "05:28 AM",
            "Jamaat": "05:45 AM",
            "Ishraaq": "06:59 AM",
            "Chaasht": "09:36 AM",
            "Qaza/Sunrise": "06:39 AM",
        },
    },
    {
        name: "Zohar",
        timings: {
            "Start": "12:33 PM",
            "Jamaat": "01:30 PM",
            "Zawaal": "--:--",
            "Qaza (Shafai)": "03:54 PM",
            "Qaza (Hanafi)": "04:49 PM",
        },
    },
    {
        name: "Asr",
        timings: {
            "Start": "04:49 PM",
            "Jamaat": "05:15 PM",
            "Start (Hanafi)": "04:49 PM",
            "Start (Shafai)": "03:54 PM",
            "Qaza": "06:27 PM",
        },
    },
    {
        name: "Maghrib",
        timings: {
            "Start": "06:30 PM",
            "Jamaat": "06:35 PM",
            "Sunset": "06:27 PM",
            "Iftaar": "06:30 PM",
            "Qaza": "07:38 PM",
        },
    },
    {
        name: "Isha",
        timings: {
            "Start": "07:38 PM",
            "Jamaat": "08:15 PM",
            "Tahajjud": "03:37 PM",
            "Sahoor End": "05:18 PM",
            "Qaza": "05:28 PM",
        },
    },
    {
        name: "Juma",
        timings: {
            "Khutba": "01:15 PM",
            "Khutba 1": "01:30 PM",
            "Khutba 2": "--:--",
            "Khutba 3": "--:--",
            "Khutba 4": "--:--",
        },
    },
];



function NamazCards() {


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
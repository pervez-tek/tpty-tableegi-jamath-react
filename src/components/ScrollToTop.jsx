import React, { useEffect, useState } from 'react'
import { FaArrowUp } from "react-icons/fa";
import "./ScrollToTop.css";

const ScrollToTop = () => {
    const [isClicked, setIsClicked] = useState(false);

    const [showBtn, setShowBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBtn(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollTop = () => {
        setIsClicked(true);

        const duration = 800; // milliseconds
        const start = window.scrollY;
        const startTime = performance.now();

        const scroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            window.scrollTo(0, start * (1 - progress));

            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        };

        requestAnimationFrame(scroll);

        setTimeout(() => {
            setIsClicked(false);
        }, 600);
    };
    return (
        <div>
            {showBtn && (
                <button className="floating-top-btn" onClick={handleScrollTop}>
                    <FaArrowUp />
                </button>
            )}
        </div>
    )
}

export default ScrollToTop
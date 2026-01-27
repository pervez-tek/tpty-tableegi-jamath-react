import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ totalStars = 5, size = 30, color = "gold", name, value = 0, onRate }) => {

    const [hover, setHover] = useState(0);

    return (
        <div className="d-flex">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <button
                        key={starValue}
                        type="button"
                        className="btn p-0 border-0 bg-transparent"
                        onClick={() => {

                            if (onRate) {
                                // 👇 mimic a synthetic event object
                                onRate({ target: { name, value: starValue } });
                            }
                        }}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <FaStar
                            size={size}
                            color={starValue <= (hover || value) ? color : "#e4e5e9"}
                        />
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;

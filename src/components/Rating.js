// src/components/Rating.js
import React from 'react';

const Rating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="rating">
            {[...Array(fullStars)].map((_, i) => (
                <span key={`full-${i}`}>&#9733;</span>
            ))}
            {halfStar && <span>&#9734;</span>}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={`empty-${i}`}>&#9734;</span>
            ))}
        </div>
    );
};

export default Rating;
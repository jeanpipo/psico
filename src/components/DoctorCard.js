// src/components/DoctorCard.js
import React from 'react';
import Rating from './Rating';

const DoctorCard = ({ doctor }) => {
    return (
        <div className="doctor-card">
            <img src={doctor.photo} alt={`Foto de ${doctor.name}`} className="doctor-photo" />
            <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
                <p>{`${doctor.city}, ${doctor.country}`}</p>
                <Rating rating={doctor.rating} />
            </div>
        </div>
    );
};

export default DoctorCard;
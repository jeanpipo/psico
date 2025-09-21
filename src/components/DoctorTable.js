import React from 'react';
import { Link } from 'react-router-dom';

function DoctorTable({ doctors }) {
    return (
        <table>
            <thead>
            <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>City</th>
                <th>Country</th>
                <th>Phone</th>
                <th>Rating</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {doctors.map(doctor => (
                <tr key={doctor.id}>
                    <td>
                        <img
                            src={doctor.photo}
                            alt={doctor.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
                        />
                    </td>
                    <td>"{doctor.name}"</td>
                    <td>{doctor.specialty}</td>
                    <td>{doctor.city}</td>
                    <td>{doctor.country}</td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.rating}</td>
                    <td>
                        <Link to={`/doctor/${doctor.id}`}>
                            <button>View</button>
                        </Link>
                        <Link to={`/doctor/appoinment/${doctor.id}`}>
                            <button>appoinment</button>
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default DoctorTable;
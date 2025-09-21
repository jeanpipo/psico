import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addDoctor } from '../redux/doctorsSlice';

function DoctorRegister() {
    const [form, setForm] = useState({
        name: '',
        specialty: '',
        country: '',
        city: '',
        photo: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addDoctor(form));
        navigate('/');
    };

    return (
        <div style={{ maxWidth: 400, margin: '40px auto', textAlign: 'left' }}>
            <h2>Registro de Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Especialidad:</label>
                    <input
                        type="text"
                        name="specialty"
                        value={form.specialty}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>País:</label>
                    <input
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Ciudad:</label>
                    <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Foto (URL):</label>
                    <input
                        type="text"
                        name="photo"
                        value={form.photo}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" style={{ marginTop: 16 }}>Registrarse</button>
            </form>
        </div>
    );
}

export default DoctorRegister;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Link, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import DoctorFilter from './components/DoctorFilter';
import DoctorTable from './components/DoctorTable';
import DoctorDetail from './components/DoctorDetail';
import BookAppoinment from './components/BookAppoinment';
import DoctorRegister from './components/DoctorRegister';
import PatientProfile from './components/PatientProfile';

function Home({ filter, setFilter, filteredDoctors }) {
    const navigate = useNavigate();
    return (
        <>
            <DoctorFilter filter={filter} setFilter={setFilter} />
            <div className="doctor-catalog">
                <DoctorTable doctors={filteredDoctors} />
            </div>
            <button
                style={{ marginTop: 24 }}
                onClick={() => navigate('/register')}
            >
                Registrarse como Doctor
            </button>

            <Link to={`/userProfile`}>
                <button>my profile</button>
             </Link>
        </>
    );
}

function App() {
    const [filter, setFilter] = useState('');
    const doctors = useSelector(state => state.doctors.list);
    console.log(doctors);
    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
        <Router>
            <div className="App">
                <h1>Catálogo de Médicos</h1>
                <Routes>
                    <Route path="/" element={
                        <Home filter={filter} setFilter={setFilter} filteredDoctors={filteredDoctors} />
                    } />
                    <Route path="/doctor/:id" element={<DoctorDetail />} />
                    <Route path="/doctor/appoinment/:id" element={<BookAppoinment />} />
                    
                    <Route path="/register" element={<DoctorRegister />} />
                    <Route path="/userProfile" element={<PatientProfile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
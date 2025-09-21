import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { doctors } from '../data/doctors';

// Dummy patient data
const patient = {
	id: 123456,
	name: 'Juan Paciente',
	country: 'Argentina',
	photo: 'https://randomuser.me/api/portraits/men/75.jpg',
	favorites: [1, 3], // doctor ids
};

function PatientProfile() {
	const appointments = useSelector(state => state.appointments.appointments);
	const navigate = useNavigate();
	// Get next appointment (future, sorted by date)
	const futureAppointments = appointments
		.filter(a => a.patientId === patient.id && new Date(a.date + 'T' + a.time) > new Date())
		.sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time));
	const nextAppointment = futureAppointments[0];

	// History: all appointments for this patient
	const history = appointments
		.filter(a => a.patientId === patient.id)
		.sort((a, b) => new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time));

	// Favorites
	const favoriteDoctors = doctors.filter(d => patient.favorites.includes(d.id));

	const [tab, setTab] = useState('profile');

	return (
		<div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
			<div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
				<img src={patient.photo} alt="profile" style={{ width: 80, height: 80, borderRadius: '50%' }} />
				<div>
					<h2>{patient.name}</h2>
					<div>País: {patient.country}</div>
				</div>
			</div>
			<div style={{ marginBottom: 24 }}>
				<button onClick={() => setTab('profile')} style={{ marginRight: 8, padding: 8, background: tab==='profile'?'#1976d2':'#eee', color: tab==='profile'?'#fff':'#333', border: 'none', borderRadius: 4 }}>Perfil</button>
				<button onClick={() => setTab('history')} style={{ marginRight: 8, padding: 8, background: tab==='history'?'#1976d2':'#eee', color: tab==='history'?'#fff':'#333', border: 'none', borderRadius: 4 }}>Historial</button>
				<button onClick={() => setTab('favorites')} style={{ padding: 8, background: tab==='favorites'?'#1976d2':'#eee', color: tab==='favorites'?'#fff':'#333', border: 'none', borderRadius: 4 }}>Favoritos</button>
			</div>
			{tab === 'profile' && (
				<div>
					<h3>Próxima cita</h3>
					{nextAppointment ? (
						<div style={{ marginBottom: 16 }}>
							<strong>Fecha:</strong> {nextAppointment.date}<br />
							<strong>Hora:</strong> {nextAppointment.time}<br />
							<strong>Doctor:</strong> {doctors.find(d => d.id === nextAppointment.doctorId)?.name}
						</div>
					) : (
						<div style={{ marginBottom: 16 }}>No tienes citas próximas.</div>
					)}
					<Link to="/">
					<button style={{ padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>
						Reservar nueva cita
					</button>
					</Link>
				</div>
			)}
			{tab === 'history' && (
				<div>
					<h3>Historial de citas</h3>
					<table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
						<thead>
							<tr style={{ background: '#eee' }}>
								<th style={{ padding: 8, border: '1px solid #ccc' }}>Fecha</th>
								<th style={{ padding: 8, border: '1px solid #ccc' }}>Doctor</th>
								<th style={{ padding: 8, border: '1px solid #ccc' }}>¿Asistió?</th>
							</tr>
						</thead>
						<tbody>
							{history.length === 0 && (
								<tr><td colSpan={3} style={{ textAlign: 'center', padding: 16 }}>Sin historial.</td></tr>
							)}
							{history.map((a, idx) => (
								<tr key={idx}>
									<td style={{ padding: 8, border: '1px solid #ccc' }}>{a.date} {a.time}</td>
									<td style={{ padding: 8, border: '1px solid #ccc' }}>{doctors.find(d => d.id === a.doctorId)?.name}</td>
									<td style={{ padding: 8, border: '1px solid #ccc' }}>{a.attended ? 'Sí' : 'No'}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
			{tab === 'favorites' && (
				<div>
					<h3>Doctores favoritos</h3>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16 }}>
						{favoriteDoctors.length === 0 && <div>No tienes doctores favoritos.</div>}
						{favoriteDoctors.map(doc => (
							<div key={doc.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, width: 220 }}>
								<img src={doc.photo} alt={doc.name} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8 }} />
								<div style={{ fontWeight: 'bold', marginTop: 8 }}>{doc.name}</div>
								<div>{doc.specialty}</div>
								<div>{doc.country}, {doc.city}</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default PatientProfile;
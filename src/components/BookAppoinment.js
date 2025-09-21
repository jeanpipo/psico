import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bookAppointment } from '../redux/appointmentsSlice';
import { doctors } from '../data/doctors';
import { doctorAvailability } from '../data/doctorAvailability';

function getRandomPatientId() {
	return Math.floor(100000 + Math.random() * 900000);
}

function BookAppoinment() {
	const { id } = useParams();
	const doctorId = parseInt(id, 10);
	const dispatch = useDispatch();
	const appointments = useSelector(state => state.appointments.appointments);

	// Find doctor and their availability
	const doctor = doctors.find(d => d.id === doctorId);
	const availability = doctorAvailability.find(a => a.doctorId === doctorId);
	const availableDates = availability ? Object.keys(availability.slots) : [];

	const [selectedDate, setSelectedDate] = useState('');
	const [selectedTime, setSelectedTime] = useState('');
	const [success, setSuccess] = useState(false);

	// Filter out already booked slots for this doctor/date
	const getAvailableTimes = (date) => {
		if (!availability || !availability.slots[date]) return [];
		const bookedTimes = appointments
			.filter(a => a.doctorId === doctorId && a.date === date)
			.map(a => a.time);
		return availability.slots[date].filter(time => !bookedTimes.includes(time));
	};

	const handleDateChange = (e) => {
		setSelectedDate(e.target.value);
		setSelectedTime('');
		setSuccess(false);
	};

	const handleTimeChange = (e) => {
		setSelectedTime(e.target.value);
		setSuccess(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!selectedDate || !selectedTime) return;
		const patientId = getRandomPatientId();
		dispatch(bookAppointment({
			doctorId,
			patientId,
			date: selectedDate,
			time: selectedTime
		}));
		setSuccess(true);
	};

	return (
		<div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
			<h2>Reservar cita con {doctor ? doctor.name : 'Doctor'}</h2>
			<Link to="/">Back</Link>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: 16 }}>
					<label>Selecciona un día:</label>
					<select value={selectedDate} onChange={handleDateChange} required style={{ width: '100%', padding: 8 }}>
						<option value="">-- Selecciona --</option>
						{availableDates.map(date => (
							<option key={date} value={date}>{date}</option>
						))}
					</select>
				</div>
				{selectedDate && (
					<div style={{ marginBottom: 16 }}>
						<label>Selecciona un horario (45 min):</label>
						<select value={selectedTime} onChange={handleTimeChange} required style={{ width: '100%', padding: 8 }}>
							<option value="">-- Selecciona --</option>
							{getAvailableTimes(selectedDate).map(time => (
								<option key={time} value={time}>{time} - {add45Minutes(time)}</option>
							))}
						</select>
					</div>
				)}
				<button type="submit" disabled={!selectedDate || !selectedTime} style={{ width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>
					Reservar cita
				</button>
				{success && <div style={{ color: 'green', marginTop: 16 }}>¡Cita reservada exitosamente!</div>}
			</form>
		</div>
	);
}

// Helper to add 45 minutes to a time string "HH:mm"
function add45Minutes(time) {
	const [h, m] = time.split(':').map(Number);
	let date = new Date(2000, 0, 1, h, m);
	date.setMinutes(date.getMinutes() + 45);
	return date.toTimeString().slice(0,5);
}

export default BookAppoinment;
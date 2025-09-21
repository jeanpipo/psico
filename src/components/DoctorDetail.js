import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../redux/doctorsSlice';

function DoctorDetail() {
    const { id } = useParams();
    const doctor = useSelector(state =>
        state.doctors.list.find(d => d.id.toString() === id)
    );
    const dispatch = useDispatch();

    const [newComment, setNewComment] = useState('');

    if (!doctor) return <div>Doctor not found</div>;

    const handleAddComment = () => {
        if (newComment.trim() === '') return;
        dispatch(addComment({ doctorId: doctor.id, comment: newComment.trim() }));
        setNewComment('');
    };

    return (
        <div>
            <Link to="/">Back</Link>
            <h2>{doctor.name}</h2>
            <img src={doctor.photo} alt={doctor.name} style={{ width: '100px', borderRadius: '50%' }} />
            <p>Specialty: {doctor.specialty}</p>
            <p>description: {doctor.description}</p>
            <p>City: {doctor.city}</p>
            <p>Country: {doctor.country}</p>
            <p>Phone: {doctor.phone}</p>
            <p>Rating: {doctor.rating}</p>
            <div>
                <h3>Comments</h3>
                <ul>
                    {doctor.comments && doctor.comments.length > 0 ? (
                        doctor.comments.map((comment, idx) => (
                            <li key={idx}>{comment}</li>
                        ))
                    ) : (
                        <li>No comments available.</li>
                    )}
                </ul>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h4>Add a comment</h4>
                <textarea
                    rows={3}
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Write your comment here..."
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                />
                <button
                    style={{ marginTop: '8px' }}
                    onClick={handleAddComment}
                    disabled={newComment.trim() === ''}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default DoctorDetail;
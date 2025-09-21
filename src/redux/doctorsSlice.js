import { createSlice } from '@reduxjs/toolkit';
import { doctors as initialDoctors } from '../data/doctors';

const doctorsSlice = createSlice({
    name: 'doctors',
    initialState: {
        list: initialDoctors,
    },
    reducers: {
        addComment: (state, action) => {
            const { doctorId, comment } = action.payload;
            const doctor = state.list.find(d => d.id === doctorId);
            if (doctor) {
                doctor.comments.push(comment);
            }
        },
        addDoctor: (state, action) => {
            const newDoctor = {
                ...action.payload,
                id: state.list.length > 0 ? Math.max(...state.list.map(d => d.id)) + 1 : 1,
                rating: 0,
                comments: [],
            };
            state.list.push(newDoctor);
        },
    },
});

export const { addComment, addDoctor } = doctorsSlice.actions;
export default doctorsSlice.reducer;


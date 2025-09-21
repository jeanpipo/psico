import React from 'react';

function DoctorFilter({ filter, setFilter }) {
    return (
        <input
            type="text"
            placeholder="Filter by doctor name"
            value={filter}
            onChange={e => setFilter(e.target.value)}
        />
    );
}

export default DoctorFilter;
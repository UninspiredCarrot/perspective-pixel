// src/EntryList.js
import React from 'react';

const EntryList = ({ entries }) => {
    return (
        <div>
            <h2>Gratitude Entries</h2>
            <ul>
                {entries.map((entry) => (
                    <li key={entry.id}>
                        <strong>Latitude:</strong> {entry.latitude}, <strong>Longitude:</strong> {entry.longitude}, <strong>Gratitude:</strong> {entry.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EntryList;

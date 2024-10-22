// App.js
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import MapComponent from './MapComponent';

const App = () => {
    const [entries, setEntries] = useState([]);

    const fetchEntries = async () => {
        try {
            const response = await Axios.get('http://34.250.30.148:3000/api/entries');
            setEntries(response.data);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    const addEntry = async (latitude, longitude, text) => {
        const newEntry = {
            latitude,
            longitude,
            text,
            // You might want to generate a unique ID and timestamp
            id: String(Date.now()), // Simple unique ID for demonstration
            timestamp: new Date().toISOString(),
        };

        try {
            await Axios.post('http://34.250.30.148:3000/api/entries', newEntry);
            // Refresh entries after adding a new one
            fetchEntries();
        } catch (error) {
            console.error('Error adding entry:', error);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div>
            <h1>World Pixel Map</h1>
            <MapComponent entries={entries} onAddEntry={addEntry} />
        </div>
    );
};

export default App;

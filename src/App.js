// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EntryForm from './EntryForm';
import EntryList from './EntryList';

const App = () => {
    const [entries, setEntries] = useState([]);

    const fetchEntries = async () => {
        try {
            const response = await axios.get('http://34.250.30.148:3000/api/entries');
            setEntries(response.data);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    const handleEntrySubmit = (newEntry) => {
        setEntries((prevEntries) => [...prevEntries, newEntry]);
    };

    return (
        <div>
            <h1>Gratitude Map</h1>
            <EntryForm onEntrySubmit={handleEntrySubmit} />
            <EntryList entries={entries} />
        </div>
    );
};

export default App;

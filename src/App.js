import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import MapComponent from './MapComponent';

const App = () => {
    const [entries, setEntries] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState(''); // To store the user's answer
    const [isAnswered, setIsAnswered] = useState(false); // To track if user has answered
    const [location, setLocation] = useState(null); // To store latitude and longitude

    const fetchEntries = async () => {
        try {
            const response = await Axios.get('http://3.255.213.246:3000/api/entries');
            setEntries(response.data);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    const fetchQuestion = async () => {
        try {
            const response = await Axios.get('http://3.255.213.246:3000/api/question');
            setQuestion(response.data.question);
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    const getLocation = async () => {
        try {
            const response = await Axios.get('http://ip-api.com/json'); // Example IP geolocation API
            setLocation({
                latitude: response.data.lat,
                longitude: response.data.lon,
            });
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    const getTodayKey = () => {
        // Get the current date in 'YYYY-MM-DD' format
        const today = new Date().toISOString().split('T')[0];
        return `answered_${today}`; // Use this as a key to track daily answers
    };

    const checkIfAnswered = () => {
        const todayKey = getTodayKey();
        const hasAnswered = localStorage.getItem(todayKey);
        setIsAnswered(!!hasAnswered); // If key exists, set isAnswered to true
    };

    const addEntry = async (text) => {
        if (isAnswered || !location) return; // Prevent multiple submissions

        const newEntry = {
            latitude: location.latitude,
            longitude: location.longitude,
            text,
            id: String(Date.now()),
            timestamp: new Date().toISOString(),
        };

        try {
            await Axios.post('http://3.255.213.246:3000/api/entries', newEntry);
            localStorage.setItem(getTodayKey(), 'true'); // Mark the answer for today in local storage
            setIsAnswered(true); // Update state to reflect that user has answered
            fetchEntries(); // Refresh entries to display the new one
        } catch (error) {
            console.error('Error adding entry:', error);
        }
    };

    const handleSubmitAnswer = () => {
        if (!answer.trim()) return; // If the answer is empty, don't submit
        addEntry(answer);
    };

    useEffect(() => {
        fetchEntries();
        fetchQuestion();
        getLocation();
        checkIfAnswered(); // Check if the user has already answered when the component loads
    }, []);

    return (
        <div>
            <h1>{question}</h1>
            <MapComponent entries={entries} />
            {!isAnswered && (
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                    />
                    <button onClick={handleSubmitAnswer}>Submit Answer</button>
                </div>
            )}
            {isAnswered && <p>You have already answered today's question.</p>}
        </div>
    );
};

export default App;

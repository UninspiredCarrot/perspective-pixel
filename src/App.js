import React, { useEffect, useState, useCallback } from 'react';
import Axios from 'axios';
import MapComponent from './MapComponent';

const App = () => {
    const [entries, setEntries] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [location, setLocation] = useState(null);

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
            const response = await Axios.get('http://ip-api.com/json');
            setLocation({
                latitude: response.data.lat,
                longitude: response.data.lon,
            });
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    const getTodayKey = () => {
        const today = new Date().toISOString().split('T')[0];
        return `answered_${today}`;
    };

    const checkIfAnswered = useCallback(() => {
        const todayKey = getTodayKey();
        const hasAnswered = localStorage.getItem(todayKey);
        setIsAnswered(!!hasAnswered);
    }, []);

    const addEntry = async (text) => {
        if (isAnswered || !location) return;

        const newEntry = {
            latitude: location.latitude,
            longitude: location.longitude,
            text,
            id: String(Date.now()),
            timestamp: new Date().toISOString(),
        };

        try {
            await Axios.post('http://3.255.213.246:3000/api/entries', newEntry);
            localStorage.setItem(getTodayKey(), 'true');
            setIsAnswered(true);
            fetchEntries();
        } catch (error) {
            console.error('Error adding entry:', error);
        }
    };

    const handleSubmitAnswer = () => {
        if (!answer.trim()) return;
        addEntry(answer);
    };

    useEffect(() => {
        fetchEntries();
        fetchQuestion();
        getLocation();
        checkIfAnswered(); // Ensure it's listed as a dependency
    }, [checkIfAnswered]); // Add checkIfAnswered as a dependency

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

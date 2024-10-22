// src/EntryForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EntryForm = ({ onEntrySubmit }) => {
    const [formData, setFormData] = useState({
        id: '',
        latitude: '',
        longitude: '',
        text: '',
        IpAddress: '',
        timestamp: new Date().toISOString(),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://34.250.30.148:3000/api/entries', formData);
            onEntrySubmit(response.data);
            setFormData({ id: '', latitude: '', longitude: '', text: '', IpAddress: '', timestamp: new Date().toISOString() });
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="id" type="text" placeholder="ID" value={formData.id} onChange={handleChange} required />
            <input name="latitude" type="number" placeholder="Latitude" value={formData.latitude} onChange={handleChange} required />
            <input name="longitude" type="number" placeholder="Longitude" value={formData.longitude} onChange={handleChange} required />
            <textarea name="text" placeholder="What are you grateful for?" value={formData.text} onChange={handleChange} required />
            <input name="IpAddress" type="text" placeholder="IP Address" value={formData.IpAddress} onChange={handleChange} required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default EntryForm;
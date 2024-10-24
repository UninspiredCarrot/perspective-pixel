import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: 'https://docs.maptiler.com/leaflet/assets/leaf_shadow.png',
        iconSize: [10, 25], // Size of the icon
        shadowSize: [20, 35], // Size of the shadow
        iconAnchor: [5, 25], // The tip of the leaf will be at the point
        shadowAnchor: [10, 35], // Position of the shadow
        popupAnchor: [0, -20] // Adjust popup position relative to the icon
    }
});

const leafIcon = new LeafIcon({ iconUrl: "https://docs.maptiler.com/leaflet/assets/leaf_marker.png" });

const MapComponent = ({ entries }) => {
    useEffect(() => {
        const map = L.map('map').setView([20, 0], 2); // Centered on the world

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap',
        }).addTo(map);

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];

        // Filter entries for today's date
        const todayEntries = entries.filter(entry => {
            const entryDate = new Date(entry.timestamp);
            // Check if the date object is valid
            return !isNaN(entryDate) && entryDate.toISOString().split('T')[0] === today;
        });

        // Add markers for today's entries
        todayEntries.forEach(entry => {
            L.marker([entry.latitude, entry.longitude], { icon: leafIcon })
                .addTo(map)
                .on('click', () => {
                    alert(entry.text); // Show the answer for the clicked entry
                });
        });

        return () => {
            map.remove(); // Cleanup map on unmount
        };
    }, [entries]);

    return <div id="map" style={{ height: '600px', width: '100%' }} />;
};

export default MapComponent;

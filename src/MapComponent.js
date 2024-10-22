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
    }});

const leafIcon = new LeafIcon({iconUrl: "https://docs.maptiler.com/leaflet/assets/leaf_marker.png"});


const MapComponent = ({ entries, onAddEntry }) => {
    useEffect(() => {
        const map = L.map('map').setView([20, 0], 2); // Centered on the world

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap',
        }).addTo(map);

        // Add markers for existing entries using custom icons
        entries.forEach(entry => {
            L.marker([entry.latitude, entry.longitude], { icon: leafIcon })
                .addTo(map)
                .on('click', () => {
                    alert(entry.text); // Replace with your modal or display logic
                });
        });

        // Handle click events on the map
        map.on('click', async (event) => {
            const { lat, lng } = event.latlng;

            // Prompt user for input
            const text = prompt('Enter your entry text:');
            if (text) {
                try {
                    await onAddEntry(lat, lng, text);
                    // Add a new marker for the newly created entry
                    L.marker([lat, lng], { icon: leafIcon }).addTo(map)
                        .on('click', () => {
                            alert(text); // Replace with your modal or display logic
                        });
                } catch (error) {
                    console.error('Error adding entry:', error);
                    alert('Failed to add entry. Please try again.');
                }
            }
        });

        return () => {
            map.remove(); // Cleanup map on unmount
        };
    }, [entries, onAddEntry]);

    return <div id="map" style={{ height: '600px', width: '100%' }} />;
};

export default MapComponent;

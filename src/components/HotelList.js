import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HotelList = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        // Fetch data from ASP.NET API
        axios.get('http://localhost:5202/api/hotel')
            .then(response => {
                setHotels(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the hotels!", error);
            });
    }, []);

    return (
        <div>
            <h1>Available Hotels</h1>
            <ul>
                {hotels.map(hotel => (
                    <li key={hotel.id}>
                        <h3>{hotel.name}</h3>
                        <p>City: {hotel.city}</p>
                        <p>Rooms Available: {hotel.roomsAvailable}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HotelList;

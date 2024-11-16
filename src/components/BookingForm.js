import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const BookingForm = () => {
    const [hotelRoomId, setHotelRoomId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [totalAmount, setTotalAmount] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const booking = {
            hotelRoomId: parseInt(hotelRoomId),
            customerName,
            customerEmail,
            checkInDate: new Date(checkInDate),
            checkOutDate: new Date(checkOutDate),
            totalAmount: parseFloat(totalAmount),
        };

        try {
            const response = await fetch('http://localhost:5202/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(booking),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Booking successful! Booking ID: ${data.id}`);
            } else {
                alert('Booking failed. Please check the details and try again.');
            }
        } catch (error) {
            console.error('Error booking room:', error);
            alert('Error booking room. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>Book a Room</Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    padding: 3,
                    borderRadius: 1,
                    boxShadow: 3,
                    backgroundColor: '#f9f9f9'
                }}
            >
                <TextField
                    label="Hotel Room ID"
                    type="number"
                    value={hotelRoomId}
                    onChange={(e) => setHotelRoomId(e.target.value)}
                    variant="outlined"
                    required
                />
                <TextField
                    label="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    variant="outlined"
                    required
                />
                <TextField
                    label="Customer Email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    variant="outlined"
                    required
                />
                <TextField
                    label="Check-In Date"
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    variant="outlined"
                    required
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Check-Out Date"
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    variant="outlined"
                    required
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Total Amount"
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    variant="outlined"
                    required
                />
                <Button type="submit" variant="contained" color="primary" size="large">
                    Book Room
                </Button>
            </Box>
        </Container>
    );
};

export default BookingForm;

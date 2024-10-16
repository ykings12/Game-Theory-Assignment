import React, { useState } from 'react';
import { createBooking } from '../services/api';

const BookingPage = () => {
  const [courtId, setCourtId] = useState('');
  const [startTime, setStartTime] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await createBooking({ courtId, startTime });
      alert('Booking created successfully!');
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <div>
      <h1>Book a Court</h1>
      <form onSubmit={handleBooking}>
        <input
          type="text"
          placeholder="Court ID"
          value={courtId}
          onChange={(e) => setCourtId(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookingPage;

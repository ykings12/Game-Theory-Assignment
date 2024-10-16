import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/App.css'; // Import your CSS here

const AvailabilityCheck = () => {
  const { courtId } = useParams(); // Get courtId from the URL
  const [slots, setSlots] = useState([]); // State to hold slot data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Function to generate time slots
  const generateSlots = () => {
    const slots = [];
    const startTime = 9; // 9 AM
    const endTime = 24; // 12 AM (midnight)
    
    for (let hour = startTime; hour < endTime; hour++) {
      slots.push({
        time: `${hour < 10 ? '0' + hour : hour}:00`,
        booked: false,
      });
    }
    return slots;
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const today = new Date();
        const date = today.toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

        const response = await fetch(`http://localhost:5000/api/bookings/${courtId}/${date}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        
        // Generate initial slots
        const initialSlots = generateSlots();
        
        // Mark booked slots based on fetched bookings
        data.forEach(booking => {
          const bookingHour = new Date(booking.startTime).getHours();
          initialSlots[bookingHour - 9].booked = true; // Update corresponding slot as booked
        });

        setSlots(initialSlots);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [courtId]);

  if (loading) {
    return <div>Loading slots...</div>; // Loading state
  }

  return (
    <div>
      <h2>All Slots Today</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
      <table>
        <thead>
          <tr>
            <th>Time Slot</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, index) => (
            <tr key={index}>
              <td>{slot.time}</td>
              <td>{slot.booked ? 'Booked' : 'Available'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailabilityCheck;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Notification Component
const Notification = ({ message, type, onClose }) => {
  const notificationStyle = {
    padding: '10px',
    backgroundColor: type === 'success' ? 'green' : 'orange',
    color: 'white',
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 1000,
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '250px',
  };

  const closeBtnStyle = {
    marginLeft: '10px',
    cursor: 'pointer',
  };

  return (
    <div style={notificationStyle}>
      <span>{message}</span>
      <span style={closeBtnStyle} onClick={onClose}>
        ✖️
      </span>
    </div>
  );
};

const AvailabilityPage = () => {
  const { courtId } = useParams();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null); // For showing notifications

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/availability/${courtId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch slots');
        }
        const data = await response.json();
        setSlots(data);
      } catch (error) {
        console.error('Error fetching slots:', error);
        setError('Failed to fetch slots. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, [courtId]);

  const handleSlotClick = (slotStartTime) => {
    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.startTime === slotStartTime
          ? { ...slot, booked: !slot.booked }
          : slot
      )
    );

    // Show notification when booking/unbooking
    const slot = slots.find((s) => s.startTime === slotStartTime);
    if (slot && !slot.booked) {
      setNotification({ message: 'Slot booked successfully!', type: 'success' });
    } else {
      setNotification({ message: 'Slot unbooked successfully!', type: 'info' });
    }

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  if (loading) {
    return <div>Loading slots...</div>;
  }

  return (
    <div>
      <h2>All Slots Today</h2>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Slot Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot.startTime}>
              <td>
                {new Date(slot.startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td>{slot.booked ? 'Booked' : 'Available'}</td>
              <td>
                <button
                  onClick={() => handleSlotClick(slot.startTime)}
                  style={{
                    backgroundColor: slot.booked ? 'gray' : 'green',
                    color: 'white',
                    cursor: slot.booked ? 'not-allowed' : 'pointer',
                  }}
                  disabled={slot.booked} // Disable button when booked
                >
                  {slot.booked ? 'Booked' : 'Book Slot'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default AvailabilityPage;

import React, { useState } from 'react';
import AvailabilityCheck from './AvailabilityCheck';

const CourtPage = ({ court }) => {
  const [showAvailability, setShowAvailability] = useState(false);

  const handleCheckAvailability = () => {
    setShowAvailability(true); // Show the availability table when the button is clicked
  };

  return (
    <div>
      <h2>{court.name}</h2>
      <button onClick={handleCheckAvailability}>Check Availability</button>
      {showAvailability && <AvailabilityCheck courtId={court._id} />}
      {/* Other court details can be added here */}
    </div>
  );
};

export default CourtPage;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/App.css'; // Import your CSS here

const CourtsPage = () => {
  const { centerId, sportId } = useParams(); // Get centerId and sportId from the URL
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [courts, setCourts] = useState([]); // State to hold courts data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/centers/${centerId}/sports/${sportId}/courts`);
        if (!response.ok) {
          throw new Error('Failed to fetch courts');
        }
        const data = await response.json();
        setCourts(data);
      } catch (error) {
        console.error('Error fetching courts:', error); // Log any errors
        // setError('Failed to fetch courts. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // Stop loading once the request is complete
      }
    };
    fetchCourts();
  }, [centerId, sportId]); // Re-run when centerId or sportId changes

  if (loading) {
    return <div>Loading courts...</div>; // Loading state
  }

  const handleCheckAvailability = (courtId) => {
    navigate(`/availability/${courtId}`); // Navigate to the availability page with the courtId
  };

  return (
    <div>
      <h2>All Courts:</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
      <div className="card-container">
        {courts.length > 0 ? (
          courts.map(court => (
            <div key={court._id} className="card"> {/* Use the correct identifier for court */}
              <h3>{court.name}</h3>
              <p>{court.description}</p>
              <button onClick={() => handleCheckAvailability(court._id)}>Check Availability</button>
            </div>
          ))
        ) : (
          <p>No courts available for this sport at the center.</p> // Message for no courts found
        )}
      </div>
    </div>
  );
};

export default CourtsPage;

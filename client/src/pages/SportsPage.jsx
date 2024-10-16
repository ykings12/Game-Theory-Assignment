import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/App.css'; // Import your CSS here

const SportsPage = () => {
  const { centerId } = useParams(); // Get the center ID from the URL
  const [sports, setSports] = useState([]); // State to hold sports data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    const fetchSports = async () => {
      try {
        // Fetch sports data based on the center ID
        const response = await fetch(`http://localhost:5000/api/centers/${centerId}/sports`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSports(data);
      } catch (error) {
        console.error('Error fetching sports:', error); // Log any errors
        // setError('Failed to fetch sports. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // Stop loading once the request is complete
      }
    };

    fetchSports();
  }, [centerId]); // Re-run when centerId changes

  // Handle court navigation
  const handleSportClick = (sportId) => {
    navigate(`/centers/${centerId}/sports/${sportId}/courts`); // Navigate to the courts page for the selected sport
  };

  if (loading) {
    return <div>Loading sports...</div>; // Loading state
  }

  return (
    <div>
      <h2>Sports available here:</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
      <div className="card-container">
        {sports.length > 0 ? (
          sports.map(sport => (
            <div 
              key={sport._id} // Ensure you're using the correct identifier
              className="card" 
              onClick={() => handleSportClick(sport._id)} // Use the handler for navigation
            >
              <h3>{sport.name}</h3>
              {/* <p>{sport.description}</p> */}
            </div>
          ))
        ) : (
          <p>No sports available at this center.</p> // Message for no sports found
        )}
      </div>
    </div>
  );
};

export default SportsPage;

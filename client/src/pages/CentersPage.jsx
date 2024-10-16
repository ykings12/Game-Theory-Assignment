import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'; // Import your CSS here
import Navbar from './Navbar'; // Import the Navbar component

const CentersPage = () => {
  const [centers, setCenters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/centers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCenters(data);
      } catch (error) {
        console.error('Error fetching centers:', error);
      }
    };
    fetchCenters();
  }, []);

  return (
    <div>
      {/* <Navbar /> Include the Navbar here */}
      <h2>Centers</h2>
      <div className="card-container">
        {centers.map(center => (
          <div 
            key={center._id} // Assuming '_id' is used as the identifier from MongoDB
            className="card" 
            onClick={() => navigate(`/centers/${center._id}/sports`)} // Navigate to sports page for the selected center
          >
            <h3>{center.name}</h3>
            <p>{center.location}</p>
            <p>{center.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CentersPage;

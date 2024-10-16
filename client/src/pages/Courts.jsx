import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourtPage from '../components/CourtPage';

const Courts = () => {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await axios.get('/api/centers/{centerId}/sports/{sportId}/courts'); // Update with actual centerId and sportId
        setCourts(response.data);
      } catch (err) {
        console.error('Error fetching courts:', err);
      }
    };

    fetchCourts();
  }, []);

  return (
    <div>
      <h1>Available Courts</h1>
      {courts.map((court) => (
        <CourtPage key={court._id} court={court} />
      ))}
    </div>
  );
};

export default Courts;

import React, { useEffect, useState } from 'react';
import { getCourts } from '../services/api';

const CourtListPage = () => {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    const fetchCourts = async () => {
      const fetchedCourts = await getCourts();
      setCourts(fetchedCourts);
    };
    fetchCourts();
  }, []);

  return (
    <div>
      <h1>Available Courts</h1>
      <ul>
        {courts.map((court) => (
          <li key={court._id}>{court.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourtListPage;

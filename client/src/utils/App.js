import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginRegisterPage from '../pages/LoginRegisterPage';
import CentersPage from '../pages/CentersPage';
import SportsPage from '../pages/SportsPage';
import CourtsPage from '../pages/CourtsPage'; 
import AvailabilityPage from '../pages/AvailabilityPage'; // Import the new component
import Navbar from '../pages/Navbar'; // Import the Navbar component
import backgroundImage from '../utils/background.jpg';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if user is authenticated

  const appStyle = {
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div style={appStyle}>
      <Router>
        <Navbar /> {/* Include the Navbar here */}
        <Routes>
          <Route path="/" element={<LoginRegisterPage />} />
          <Route path="/dashboard" element={isAuthenticated ? <CentersPage /> : <Navigate to="/" />} />
          <Route path="/centers/:centerId/sports" element={isAuthenticated ? <SportsPage /> : <Navigate to="/" />} />
          <Route path="/centers/:centerId/sports/:sportId/courts" element={isAuthenticated ? <CourtsPage /> : <Navigate to="/" />} />
          <Route path="/availability/:courtId" element={isAuthenticated ? <AvailabilityPage /> : <Navigate to="/" />} /> {/* Added route */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;

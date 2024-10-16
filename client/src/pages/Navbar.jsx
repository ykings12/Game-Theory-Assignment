import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/');
  };

  return (
    <nav style={navbarStyle}>
      <h1 style={{ margin: '0',color:'white' }}>Sports Hub</h1>
      <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
    </nav>
  );
};

// Navbar styles
const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: 'black',
  color: 'white',
};

const logoutButtonStyle = {
  backgroundColor: 'transparent',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
};

export default Navbar;

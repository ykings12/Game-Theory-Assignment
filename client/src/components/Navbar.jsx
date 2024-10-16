import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Courts</Link></li>
        <li><Link to="/bookings">Bookings</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

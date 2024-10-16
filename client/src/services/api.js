import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Change this to your deployed API URL

// Create a booking
export const createBooking = async (bookingData) => {
  const response = await axios.post(`${API_URL}/bookings`, bookingData);
  return response.data;
};

// Get all courts
export const getCourts = async () => {
  const response = await axios.get(`${API_URL}/courts`);
  return response.data;
};

// Get bookings by date
export const getBookingsByDate = async (date) => {
  const response = await axios.get(`${API_URL}/bookings/${date}`);
  return response.data;
};

// Update a booking
export const updateBooking = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/bookings/${id}`, updatedData);
  return response.data;
};

// Delete a booking
export const deleteBooking = async (id) => {
  const response = await axios.delete(`${API_URL}/bookings/${id}`);
  return response.data;
};

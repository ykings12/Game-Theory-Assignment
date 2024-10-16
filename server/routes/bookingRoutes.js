const express = require('express');
const {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,getAvailability
} = require('../controllers/bookingController');

const router = express.Router();

// Booking routes
router.post('/', createBooking); // Create a new booking
router.get('/:date', getBookings); // Get bookings by date
router.put('/:id', updateBooking); // Update a booking
router.delete('/:id', deleteBooking); // Delete a booking
// Add this route
router.get('/availability/:courtId/:date', getAvailability); // Get availability for a specific court and date
// Add this delete route to unbook a slot
router.delete('/', async (req, res) => {
  const { courtId, date, startTime } = req.body;

  try {
    await Booking.deleteOne({
      court: courtId,
      date: date,
      startTime: new Date(startTime),
    });
    res.status(200).json({ message: 'Booking cancelled' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Failed to cancel booking' });
  }
});



module.exports = router;

const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Adjust path as necessary

// Get availability for a specific court
router.get('/:courtId', async (req, res) => {
  const courtId = req.params.courtId;

  // Define the available time slots
  const slots = [];
  const startHour = 9; // 9 AM
  const endHour = 24; // 12 AM
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of the day

  for (let hour = startHour; hour < endHour; hour++) {
    const startTime = new Date(today);
    startTime.setHours(hour);

    // Check for existing bookings for this court and date
    const booking = await Booking.findOne({
      court: courtId,
      date: today.toISOString().split('T')[0], // Get date in YYYY-MM-DD format
      startTime: { $eq: startTime }
    });

    slots.push({ startTime: startTime.toISOString(), booked: !!booking }); // Store slots with booking status
  }

  res.json(slots); // Return the slots array as JSON
});

module.exports = router;

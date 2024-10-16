const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body); // Log the entire request body
    const { courtId, date, startTime, endTime } = req.body;

    // Construct dates from incoming data
    const startDate = new Date(`${date}T${startTime}`);
    const endDate = new Date(`${date}T${endTime}`);

    // Log the constructed dates
    console.log("Constructed Start Date:", startDate);
    console.log("Constructed End Date:", endDate);

    // Validate dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date or time provided' });
    }

    // Proceed to create the booking
    const newBooking = new Booking({
      courtId,
      startTime: startDate,
      endTime: endDate,
    });

    await newBooking.save();
    return res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ message: 'Error creating booking' });
  }
};


// exports.createBooking = async (req, res) => {
//   try {
//     const { courtId, date, startTime, endTime } = req.body;

//     // Ensure the times are valid
//     const startDate = new Date(`${date}T${startTime}`);
//     const endDate = new Date(`${date}T${endTime}`);

//     // Check if dates are valid
//     if (isNaN(startDate) || isNaN(endDate)) {
//       return res.status(400).json({ message: 'Invalid date or time provided' });
//     }

//     // Proceed to create the booking
//     const newBooking = new Booking({
//       courtId,
//       startTime: startDate,
//       endTime: endDate,
//     });

//     await newBooking.save();
//     return res.status(201).json(newBooking);
//   } catch (error) {
//     console.error('Error creating booking:', error);
//     return res.status(500).json({ message: 'Error creating booking' });
//   }
// };

// Create a new booking
// exports.createBooking = async (req, res) => {
//   const { court, user, startTime, date } = req.body;

//   try {
//     // Check for an existing booking in the 60-minute slot
//     const endTime = new Date(date);
//     const [hour, minute] = startTime.split(':');
//     endTime.setHours(hour, minute, 0); // Set time based on startTime
//     const endTimeNextHour = new Date(endTime);
//     endTimeNextHour.setHours(endTimeNextHour.getHours() + 1); // Add 1 hour

//     const existingBooking = await Booking.findOne({
//       court,
//       date,
//       startTime: { $gte: endTime.toISOString(), $lt: endTimeNextHour.toISOString() }
//     });

//     if (existingBooking) {
//       return res.status(400).json({ msg: 'Slot already booked' });
//     }

//     const booking = new Booking({ court, user, startTime, date });
//     await booking.save();
//     res.status(201).json(booking);
//   } catch (err) {
//     console.error('Error creating booking:', err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// Get all bookings for a specific date
exports.getBookings = async (req, res) => {
  const { date } = req.params;

  try {
    const bookings = await Booking.find({ date }).populate('court user');
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const { court, user, startTime, date } = req.body;

  try {
    // Check for an existing booking in the 60-minute slot
    const endTime = new Date(date);
    const [hour, minute] = startTime.split(':');
    endTime.setHours(hour, minute, 0);
    const endTimeNextHour = new Date(endTime);
    endTimeNextHour.setHours(endTimeNextHour.getHours() + 1);

    const existingBooking = await Booking.findOne({
      court,
      date,
      startTime: { $gte: endTime.toISOString(), $lt: endTimeNextHour.toISOString() }
    });

    if (existingBooking && existingBooking._id.toString() !== id) {
      return res.status(400).json({ msg: 'Slot already booked' });
    }

    const booking = await Booking.findByIdAndUpdate(id, { court, user, startTime, date }, { new: true });
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    console.error('Error updating booking:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });
    res.json({ msg: 'Booking deleted' });
  } catch (err) {
    console.error('Error deleting booking:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Add this function in your bookingController.js

// Get availability for a specific court and date
exports.getAvailability = async (req, res) => {
  const { courtId, date } = req.params;
  const availableSlots = [];
  const totalSlots = 15; // Total slots from 9 AM to 12 AM (15 slots)
  
  // Generate slots from 9 AM to 12 AM
  for (let i = 0; i < totalSlots; i++) {
    const startTime = new Date(date);
    startTime.setHours(9 + i); // Start from 9 AM
    const slotTime = `${String(startTime.getHours()).padStart(2, '0')}:00`;

    const existingBooking = await Booking.findOne({ court: courtId, date, startTime: slotTime });

    availableSlots.push({
      time: slotTime,
      isBooked: !!existingBooking
    });
  }

  res.json(availableSlots);
};

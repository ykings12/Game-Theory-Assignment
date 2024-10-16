const Court = require('../models/Court');


// Get all courts for a specific sport at a specific center
exports.getCourtsForSport = async (req, res) => {
  const { centerId, sportId } = req.params; // Get parameters from the request

  try {
    const courts = await Court.find({ center: centerId, sport: sportId }).populate('sport center'); // Populate sport and center details
    if (courts.length === 0) {
      return res.status(404).json({ msg: 'No courts found for this sport at the specified center.' });
    }
    res.json(courts); // Return the list of courts
  } catch (err) {
    console.error('Error fetching courts:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all courts for a specific center
exports.getCourtsByCenter = async (req, res) => {
  const { centerId } = req.params; // Get center ID from request parameters

  try {
    // Fetch courts associated with the center ID
    const courts = await Court.find({ center: centerId }).populate('sport'); // Populate sport if needed
    if (!courts.length) {
      return res.status(404).json({ msg: 'No courts found for this center' });
    }
    res.json(courts); // Return the list of courts
  } catch (err) {
    console.error('Error fetching courts:', err); // Log the error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
};

// Implement other court functions like createCourt, updateCourt, deleteCourt as needed


// Create a new court
exports.createCourt = async (req, res) => {
  console.log('POST request received to create a court:', req.body); // Add this line for debugging

  const { name, sport, center, availableSlots } = req.body;

  try {
    const court = new Court({ name, sport, center, availableSlots });
    await court.save();
    res.status(201).json(court);
  } catch (err) {
    console.error('Error creating court:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};


// Get all courts for a specific sport
exports.getCourts = async (req, res) => {
  const { sportId } = req.params;

  try {
    const courts = await Court.find({ sport: sportId }); // Use sportId to find courts
    res.json(courts);
  } catch (err) {
    console.error('Error fetching courts:', err); // Log error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update a court
exports.updateCourt = async (req, res) => {
  const { id } = req.params;
  const { name, sportId, center, availableSlots } = req.body;

  try {
    const court = await Court.findByIdAndUpdate(
      id,
      { name, sport: sportId, center, availableSlots },
      { new: true }
    );
    if (!court) return res.status(404).json({ msg: 'Court not found' });
    res.json(court);
  } catch (err) {
    console.error('Error updating court:', err); // Log error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a court
exports.deleteCourt = async (req, res) => {
  const { id } = req.params;

  try {
    const court = await Court.findByIdAndDelete(id);
    if (!court) return res.status(404).json({ msg: 'Court not found' });
    res.json({ msg: 'Court deleted' });
  } catch (err) {
    console.error('Error deleting court:', err); // Log error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
};

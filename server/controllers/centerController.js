const Center = require('../models/Center');
const Sport = require('../models/Sport'); // Ensure you import the Sport model
const Court = require('../models/Court'); // Make sure you import the Court model


// Get all courts for a specific sport at a center
exports.getCourts = async (req, res) => {
  const { center, id } = req.params; // Get center and sportId from the route parameters

  try {
    // Find courts by center and sportId
    const courts = await Court.find({ center, sport: id }); // Adjust the query based on your Court model
    if (!courts.length) {
      return res.status(404).json({ msg: 'No courts found for this sport at the specified center.' });
    }
    res.json(courts); // Return the found courts
  } catch (err) {
    console.error('Error fetching courts:', err); // Log the error for debugging
    res.status(500).json({ msg: 'Server error' }); // Return a server error response
  }
};

// Create a new center
exports.createCenter = async (req, res) => {
  const { name, location } = req.body;

  try {
    const center = new Center({ name, location });
    await center.save();
    res.status(201).json(center);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all centers
exports.getCenters = async (req, res) => {
  try {
    const centers = await Center.find();
    res.json(centers);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update a center
exports.updateCenter = async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;

  try {
    const center = await Center.findByIdAndUpdate(id, { name, location }, { new: true });
    if (!center) return res.status(404).json({ msg: 'Center not found' });
    res.json(center);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a center
exports.deleteCenter = async (req, res) => {
  const { id } = req.params;

  try {
    const center = await Center.findByIdAndDelete(id);
    if (!center) return res.status(404).json({ msg: 'Center not found' });
    res.json({ msg: 'Center deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all sports available at a particular center
exports.getSportsByCenter = async (req, res) => {
  const { id } = req.params; // Get center ID from request parameters

  try {
    // Fetch sports associated with the center ID
    const sports = await Sport.find({ center: id });
    if (!sports.length) {
      return res.status(404).json({ msg: 'No sports found for this center' });
    }
    res.json(sports); // Return the list of sports
  } catch (err) {
    console.error('Error fetching sports:', err); // Log the error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
};

const Sport = require('../models/Sport');

// const Court = require('../models/Court'); // Make sure to import your Court model

// // Get all courts for a specific sport at a center
// exports.getCourts = async (req, res) => {
//   const { center, id } = req.params; // Get center and sportId from the route parameters

//   try {
//     // Find courts by center and sportId
//     const courts = await Court.find({ center, sport: id }); // Adjust the query based on your Court model
//     if (!courts.length) {
//       return res.status(404).json({ msg: 'No courts found for this sport at the specified center.' });
//     }
//     res.json(courts); // Return the found courts
//   } catch (err) {
//     console.error('Error fetching courts:', err); // Log the error for debugging
//     res.status(500).json({ msg: 'Server error' }); // Return a server error response
//   }
// };

// Create a new sport
exports.createSport = async (req, res) => {
  const { name, center } = req.body; // Use 'center' as it's defined in your Sport model

  try {
    const sport = new Sport({ name, center }); // Use 'center' instead of 'centerId'
    await sport.save();
    res.status(201).json(sport);
  } catch (err) {
    console.error('Error creating sport:', err); // Log the error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getSports = async (req, res) => {
  let { center } = req.params; // This should match the route parameter
  center = center.trim(); // Trim whitespace and newline characters
  console.log('Fetching sports for center:', center); // Log the center being queried

  try {
    const sports = await Sport.find({ center }); // Use 'center' to query based on the center ID
    console.log('Found sports:', sports); // Log the result from the database
    res.json(sports);
  } catch (err) {
    console.error('Error fetching sports:', err); // Log the error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
};


// Update a sport
exports.updateSport = async (req, res) => {
  const { id } = req.params;
  const { name, center } = req.body; // Use 'center' as it's defined in your Sport model

  try {
    const sport = await Sport.findByIdAndUpdate(id, { name, center }, { new: true });
    if (!sport) return res.status(404).json({ msg: 'Sport not found' });
    res.json(sport);
  } catch (err) {
    console.error('Error updating sport:', err); // Log the error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a sport
exports.deleteSport = async (req, res) => {
  const { id } = req.params;

  try {
    const sport = await Sport.findByIdAndDelete(id);
    if (!sport) return res.status(404).json({ msg: 'Sport not found' });
    res.json({ msg: 'Sport deleted' });
  } catch (err) {
    console.error('Error deleting sport:', err); // Log the error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
};

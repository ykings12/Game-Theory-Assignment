const express = require('express');
const {
  createCenter,
  getCenters,
  updateCenter,
  deleteCenter,
  getSportsByCenter,getCourts // Import the controller function to get sports by center
} = require('../controllers/centerController'); // Ensure this is the correct path

const router = express.Router();

// Center routes
router.post('/', createCenter); // Create a new center
router.get('/', getCenters); // Get all centers
router.put('/:id', updateCenter); // Update a center
router.delete('/:id', deleteCenter); // Delete a center

// New route to get all sports available at a particular center
router.get('/:id/sports', getSportsByCenter); // Get sports by center ID
router.get('/:center/sports/:id/courts', getCourts); // Get all courts for a specific sport at a center

module.exports = router;

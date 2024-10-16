const express = require('express');
const {
  createSport,
  getSports,
  updateSport,
  deleteSport,
  getCourts // Import your courts handler
} = require('../controllers/sportController');

const router = express.Router();

// Sport routes
router.post('/', createSport); // Create a new sport
router.get('/:center', getSports); // Get all sports for a specific center
router.put('/:id', updateSport); // Update a sport
router.delete('/:id', deleteSport); // Delete a sport

// Add a new route to get courts for a specific sport at a center
// router.get('/:center/sports/:id/courts', getCourts); // Get all courts for a specific sport at a center

module.exports = router;

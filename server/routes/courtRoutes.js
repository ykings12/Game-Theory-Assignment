const express = require('express');
const {
  createCourt,
  getCourtsByCenter,
  updateCourt,
  deleteCourt,getCourtsForSport
} = require('../controllers/courtController');

const router = express.Router();

// Court routes
router.post('/', createCourt); // Create a new court
router.get('/center/:centerId', getCourtsByCenter); // Get all courts for a specific center
router.put('/:id', updateCourt); // Update a court
router.delete('/:id', deleteCourt); // Delete a court
router.get('/:centerId/sports/:sportId/courts', getCourtsForSport); // Get all courts for a specific sport at a specific center

module.exports = router;


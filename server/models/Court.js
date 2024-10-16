const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true,
  },
  center: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    required: true,
  },
  availableSlots: {
    type: Number,
    default: 0, // Set default value for available slots
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Court', courtSchema);

// models/Sport.js
const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: true,
  },
  center: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Sport', sportSchema);

const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  capital: {
    type: String,
    required: true,
  },
  continent: {
    type: String,
    required: true,
  },
  population: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  flag: {
    public_id: String,
    url: String,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Country', countrySchema);

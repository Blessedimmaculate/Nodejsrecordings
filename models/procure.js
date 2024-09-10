const mongoose = require('mongoose');

const procureSchema = new mongoose.Schema({
  produceName: {
    type: String,
    trim: true,
  },
  produceType: {
    type: String,
    trim: true,
  },
  date: {
    type: Date, // Corrected from 'date' to 'Date'
    trim: true,
  },
  time: {
    type: String, // Corrected from 'string' to 'String'
    trim: true,
  },
  stock: {
    type: Number,
    trim: true,
  },
  cost: {
    type: Number,
    trim: true,
  },
  dealerName: {
    type: String,
    trim: true,
  },
  branch: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
  },
  contact: {
    type: String,
    trim: true,
  },
  totalcost: {
    type: Number,
    trim: true,
  },
  produceSource: {
    type: String,
    trim: true,
  },
  companyName: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Procure', procureSchema);

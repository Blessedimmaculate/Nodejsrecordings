const mongoose = require('mongoose');

// Define the Sale schema
const newSaleSchema = new mongoose.Schema({
  produceNameSale: {
    type: String,
    required: true
  },
  tonnageSale: {
    type: Number,
    required: true
  },
  amountPaid: {
    type: Number,
    required: true
  },
  buyerNameSale: {
    type: String,
    required: true
  },
  salesAgentNameSale: {
    type: String,
    required: true
  },
  dateSale: {
    type: Date,
    required: true
  },
  timeSale: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create a model from the schema
module.exports = mongoose.model("NewSale", newSaleSchema);

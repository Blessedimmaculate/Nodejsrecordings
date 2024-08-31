const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  produceName: {
    type: String,
    trim: true,
    required: true,
  },
  saleTonnage: {
    type: Number,
    trim: true,
    required: true,
  },
  amount: {
    type: Number,
    trim: true,
    required: true,
  },
  buyerName: {
    type: String,
    trim: true,
    required: true,
  },
  salesAgent: {
    type: String,
    trim: true,
    required: true,
  },
  saledate: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model("Sale", saleSchema);

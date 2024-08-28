const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  produceName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produce"
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
  },
  saledate: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model("Sale", saleSchema);

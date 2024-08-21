const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
    produceName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stock"
    },
    saleTonnage: {
        type: Number,
        trim: true,
    },
    amount: {
        type: Number,
        trim: true,
    },
    buyerName: {
        type: String,
        trim: true
    },
    salesAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Register",
    },
    saledate: {
        type: Date,  // Store as Date object
    }
});

// Export the model
module.exports = mongoose.model("Sale", saleSchema);

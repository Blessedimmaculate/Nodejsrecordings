const mongoose = require("mongoose");

const makeSaleSchema = new mongoose.Schema({
    produceName: {
        type: String,
        trim: true,
    },
    produceName: {
        type: String,
        trim: true,
    },
    saleTonnage: {
        type: Number,
        trim: true,
    },
    amountPaid: {
        type: Number,
        trim: true,
    },
    branchName: {
        type: String,
        trim: true
    },
    salesAgentNameSale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Register",
    },
    saleDate: {
        type: Date,  // Store as Date object
    }
});


// Export the model
module.exports = mongoose.model("MakeSale", makeSaleSchema);
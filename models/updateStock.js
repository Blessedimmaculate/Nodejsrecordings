const mongoose = require("mongoose");

const updateStockSchema = new mongoose.Schema({
    storeBranch: {
        type: String,
        trim: true
    },
    produceName: {
        type: String,
        trim: true
    },
    produceType: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String
    },
    tonnage: {
        type: Number
    },
    dealerName: {
        type: String,
        trim: true
    },
    companyName: {
        type: String,
        trim: true
    },
    cost: {
        type: Number
    },
    totalcost: {
        type: Number
    },
    produceSource: {
        type: String,
        trim: true
    },
    contact: {
        type: Number
    },
    branchName: {
        type: String,
        trim: true
    },
    sellingPrice: {
        type: Number
    }
});

module.exports = mongoose.model("UpdateStock", updateStockSchema);

const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    storeBranch: {
        type: String,
        trim: true
    },
    produceName: {
        type: String,
        trim: true
    },
    typeOfProduce: {
        type: String,
        trim: true
    },
    date: {
        type: Date, 
    },
    time: {
        type: String, 
        trim: true,
    },
    tonnage: {
        type: Number,
    },
    cost: {
        type: Number,
    },
    produceSource: {
        type: String,
        trim: true
    },
    dealerName: {
        type: String,
        trim: true
    },
    companyName: {
        type: String,
        trim: true
    },
    branchName: {
        type: String,
        trim: true
    },
    contact: {
        type: String,
        trim: true
    },
    sellingPrice: {
        type: Number,
    }
});

module.exports = mongoose.model("Stock", stockSchema);

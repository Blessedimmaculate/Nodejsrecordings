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
        type: Date,  // Store as Date object
    },
    time: {
        type: String, // Store time as a string (or include it in the date object)
        trim: true,
    },
    tonnage: {
        type: Number,
       
    },
    cost: {
        type: Number,
    },
    totalcost: {
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
        type: String, // Store contact as a string
        trim: true
    },
    sellingPrice: {
        type: Number,
       
    }
});

// Export the model
module.exports = mongoose.model("Stock", stockSchema);

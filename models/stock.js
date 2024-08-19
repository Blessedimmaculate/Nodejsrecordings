const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    produceName:{
        type: String,
        trim: true
    },
    typeOfProduce:{
        type: String,
        trim: true
    },
    date:{
        type: Date,  // Store as Date object
    },
    time:{
        type: String, // Store time as a string (or include it in the date object)
        trim: true
    },
    tonnage:{
        type: Number,
        trim: true
    },
    cost:{
        type: Number,
        trim: true
    },
    dealerName:{
        type: String,
        trim: true
    },
    branchName:{
        type: String,
        trim: true
    },
    contact:{
        type: String, // Store contact as a string
        trim: true
    },
});

// Export the model
module.exports = mongoose.model("Stock", stockSchema);

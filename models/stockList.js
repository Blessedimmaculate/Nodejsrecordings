const mongoose = require("mongoose");

const stockListSchema = new mongoose.Schema({
    produceName:{
        type: String,
        trim: true
    },
    typeOfProduce:{
        type: String,
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
    date:{
        type: Date,  // Store as Date object
    },
    actions:{
        type: String,
        trim: true
    },
});

module.exports = mongoose.model("StockList", stockListSchema)
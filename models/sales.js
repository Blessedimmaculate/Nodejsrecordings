const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
   
    produceName:{
        type: String,
        trim: true,
    },
    tonnage:{
        type: Number,
        trim: true,
    },
    amountPaid:{
        type: String,
        trim: true,
    },
    buyername:{
        type: String,
        trim: true,
    },
    salesagent:{
        type: String,
        trim: true,
    },
    branch:{
        type: String,
        trim: true,
    },
    dateTime:{
        type: String,
        trim: true,
    },
    totalpayment:{
        type: Number,
        trim: true,
    },
})

module.exports = mongoose.model('sales', salesSchema);
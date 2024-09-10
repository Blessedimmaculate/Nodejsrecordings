const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
    produceName:{
        type: String,
        trim: true,
    },
    buyerName:{
        type: String,
        trim: true,
    },
    nationalid:{
        type: String,
        trim: true,
    },
    location:{
        type: String,
        trim: true,
    },
    contact:{
        type: String,
        trim: true,
    },
    produceCost:{
        type: Number,
        trim: true,
    },
    totalCost:{
        type: Number,
        trim: true,
    },
    amountPaid:{
        type: Number,
        trim: true,
    },
    amountDue:{
        type: String,
        trim: true,
    },
    salesagent:{
        type: String,
        trim: true,
    },
    time:{
        type: String,
        trim: true,
    },
    dueDate:{
        type: String,
        trim: true,
    },
    branch:{
        type: String,
        trim: true,
    },
    produceType:{
        type: String,
        trim: true,
    },
    tonnage:{
        type: Number,
        trim: true,
    },
    dispatchDate:{
        type: String,
        trim: true,
    }
})

module.exports = mongoose.model('credit', creditSchema);
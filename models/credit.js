const mongoose = require("mongoose");

const creditSchema = new mongoose.Schema({
    produceName: {
        type: String,
        trim: true,
        required: true,
      },
    buyerName: {
        type: String,
        trim: true,
        required: true,
      },
    time: {
        type: String, 
        trim: true,
      },
    storeBranch: {
        type: String,
        trim: true,
        required: true,
      },
    nationalID: {
        type: String,
        trim: true,
        required: true,
      },
    buyerLocation: {
        type: String,
        trim: true,
        required: true,
      },
    contacts: {
        type: Number,
        trim: true,
      },
    amountPaid: {
        type: Number,
        trim: true,
      },
    amountDue: {
            type: Number,
            trim: true,
      }, 
    dueDate: {
        type: Date,
      },
    typeofProduce: {
        type: String,
        trim: true,
      },
    tonnage: {
        type: Number,
        trim: true,
      },
    dateofDispatch: {
        type: Date,
      },
    salesAgent: {
        type: String,
        trim: true,
      },
});

module.exports = mongoose.model("Credit", creditSchema);
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
    typeOfProduce: {
        type: String,
        trim: true
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
   
    branchName: {
        type: String,
        trim: true
    },
   
    sellingPrice: {
        type: Number,
       
    }
});

// Export the model
module.exports = mongoose.model("UpdateStock", updateStockSchema);

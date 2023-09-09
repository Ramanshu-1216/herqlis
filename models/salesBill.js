const mongoose = require('mongoose');

const salesBillSchema = mongoose.Schema({
    imgUrl: {
        type: String,
        // required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reimbursementStatus: {
        type: String,
        required: true
    },
    reimbursedAmount : {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    salesId: {
        type: String,
        required: true
    },
    dateData:{
        type: Date
    }
});

const salesBillModel = mongoose.model('SalesBill', salesBillSchema);

module.exports = salesBillModel;


const mongoose = require('mongoose');

const billSchema = mongoose.Schema(
    {
    billId: {
        type: String,
        required: true,
    },
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
    serviceId: {
        type: String,
        required: true
    },
    dateData:{
        type: Date
    }
});
serviceSchema.pre('save', function(next) {
    if (this.billId == "none") {
        // Generate the 6-digit ID if it doesn't exist
        const sixDigitID = generateSixDigitID(this._id);
        this.billId = sixDigitID;
    }
    next();
});
const billModel = mongoose.model('Bill', billSchema);

module.exports = billModel;

function generateSixDigitID(objectId) {
    const hexString = objectId.toHexString();
    const integerID = parseInt(hexString, 16);
    const sixDigitID = (integerID % 900000) + 100000; // Ensure it's a 6-digit number
    return sixDigitID.toString();
}
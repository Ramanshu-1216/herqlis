const mongoose = require('mongoose');
const prospectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    firm: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    assignedTo: {
        type: String,
    },
    prospectDetails: {
        buyerHistory: {
            newBuyer: {
                type: Boolean,
            },
            comments: {
                type: String,
            },
        },
        platformDetails: {
            platform:{
                type: String,
            },
            comments: {
                type: String,
            },
        },
        modelDetails: {
            model: {
                type: String,
            },
            comments: {
                type: String,
            }
        },
        finances: {
            type: String,
        }
    },
    registeredOn: {
        type: Date,
        required: true,
    },
    assignedOn: {
        type: Date,
    },
    status: {
        type: String,
        required: true,
    },
    call: [
        {
            date: String,
            message: String,
        }
    ]
});
const prospectModel = mongoose.model('Prospect', prospectSchema);
module.exports = prospectModel;
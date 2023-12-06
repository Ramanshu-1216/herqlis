const mongoose = require('mongoose');
const prospectSchema = mongoose.Schema({
    prospectId: {
        type: String,
        required: true,
    },
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
    locationCordinates: {
        start: {
            lat: String,
            long: String,
        },
        departure: {
            lat: String,
            long: String,
        },
        end: {
            lat: String,
            long: String,
        },
        returned: {
            lat: String,
            long: String,
        }
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
            platform: {
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
    da: {
        distance: {
            type: String,
        }
    },
    call: [
        {
            date: String,
            message: String,
            distance: String,
            prospect: {},
        }
    ],
    assignedFrom: {
        type: String,
    },
    advance: {
        type: Number
    }
});
prospectSchema.pre('save', function (next) {
    if (this.prospectId == "none") {
        const sixDigitID = generateSixDigitID(this._id);
        this.prospectId = sixDigitID;
    }
    next();
});
function generateSixDigitID(objectId) {
    const hexString = objectId.toHexString();
    const integerID = parseInt(hexString, 16);
    const sixDigitID = (integerID % 900000) + 100000; // Ensure it's a 6-digit number
    return sixDigitID.toString();
}

const prospectModel = mongoose.model('Prospect', prospectSchema);
module.exports = prospectModel;
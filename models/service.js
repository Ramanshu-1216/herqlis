const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    serviceId: {
        type: String,
        required: true,
    },
    serviceType: {
        type: String,
        required: true
    },
    locationCordinates: {
        departure: {
            lat: String,
            long: String,
        },
        start: {
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
    location: {
        type: {
            latitude: {
                type: String,
                required: true
            },
            longitude: {
                type: String,
                required: true
            }
        },
        required: true
    },
    requestDate: {
        type: String
    },
    acceptenceDate: {
        type: String,
        // required: true
    },
    completionDate: {
        type: String,
        // required: true
    },
    warranty: {
        type: Boolean
    },
    issueDetail: {
        type: String,
        required: true
    },
    issueDescription: {
        type: String,
        required: true
    },
    serviceCost: {
        type: Number,
        required: true
    },
    clientDetails: {
        type: {
            name: {
                type: String,
                required: true
            },
            mobNumber: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            email: {
                type: String,
            },
            company: {
                type: String,
                required: true
            }
        },
        required: true
    },
    startDate: {
        type: String,
    },
    status: {
        type: String,
        required: true
    },
    serviceFeedback: {
        type: String
    },
    userId: {
        type: Array
    },
    advance: {
        type: Number,
    },
    isPublic: {
        type: Boolean,
    },
    da: {
        distance: {
            type: String,
        }
    },
});

serviceSchema.pre('save', function(next) {
    if (this.serviceId != "none") {
        // Generate the 6-digit ID if it doesn't exist
        const sixDigitID = generateSixDigitID(this._id);
        this.serviceId = sixDigitID;
    }
    next();
});
const serviceModel = mongoose.model('Service', serviceSchema);

module.exports = serviceModel;
function generateSixDigitID(objectId) {
    const hexString = objectId.toHexString();
    const integerID = parseInt(hexString, 16);
    const sixDigitID = (integerID % 900000) + 100000; // Ensure it's a 6-digit number
    return sixDigitID.toString();
}
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    mobileNum: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    profilePic: {
        type: String
    },
    userServices: {
        type: Array
    },
    servicesUserCanDo: {
        type: Array,
        required: true
    },
    employeeType: {
        type: String,
        required: true
    },
    billsToReimburse: {
        type: Array
    },
    gender: {
        type: String
    },
    speciality: {
        type: Array
    },
    address: {
        type: String
    },
    location: {
        type: {
            latitude: {
                type: String
            },
            longitude: {
                type: String
            }
        }
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) {
    if (this.userId != "none") {
        // Generate the 6-digit ID if it doesn't exist
        const sixDigitID = generateSixDigitID(this._id);
        this.userId = sixDigitID;
    }
    next();
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;

function generateSixDigitID(objectId) {
    const hexString = objectId.toHexString();
    const integerID = parseInt(hexString, 16);
    const sixDigitID = (integerID % 900000) + 100000; // Ensure it's a 6-digit number
    return sixDigitID.toString();
}
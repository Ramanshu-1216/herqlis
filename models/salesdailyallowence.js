const mongoos = require('mongoose');

const salesSailyallowenceSchema = mongoos.Schema({
    employeeId: {
        type: String,
        required: true
    },
    salesId: {
        type: String,
        required: true
    },
    startData: {
        locationDetail: {
            latitude: {
                type: String
            },
            longitude: {
                type: String
            }
        },
        startTime: {
            type: Date
        }
    },
    endData: {
        locationDetail: {
            latitude: {
                type: String
            },
            longitude: {
                type: String
            }
        },
        endTime: {
            type: Date
        }
    }
});

const salesDailyallowenceModel = mongoos.model('SalesDailyAllowence', salesSailyallowenceSchema);

module.exports = salesDailyallowenceModel;
const salesdailyallowenceModel = require("../../../models/salesdailyallowence");

const addSalesDailyAllowence = (req, res) => {
    const salesId = req.body.salesId;
    const employeeId = req.body.employeeId;

    let dailm = new salesdailyallowenceModel();
    dailm.salesId = salesId;
    dailm.employeeId = employeeId;
    let strtdt = {
        locationDetail: {
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        },
        startTime: new Date()
    }
    dailm.startData = strtdt;

    dailm.save().then((resp1) => {
        res.status(200).send({
            'message': 'Daily allowence added',
            'data': resp1
        });
    }).catch((er1) => {
        res.send(er1);
    });
}

module.exports = addSalesDailyAllowence;
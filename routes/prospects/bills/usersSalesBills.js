const salesBillModel = require('../../../models/salesBill');

const usersSalesBills = (req, res) => {
    const userId = req.params.userId;
    salesBillModel.find({
        userId: userId
    }).then((resp1) => {
        res.send({
            'message': 'Users bills',
            'data': resp1
        });
    }).catch((er1) => {
        res.send(er1);
    });
}

module.exports = usersSalesBills;
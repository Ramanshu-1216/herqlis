const salesBillModel = require('../../../models/salesBill');

const getSalesBills = ( req, res) => {
    salesBillModel.find().then((resp1) => {
        res.send({
            'message': 'All the bills are here',
            'data': resp1
        });
    }).catch((er1) => {
        res.send(er1);
    });
}

module.exports = getSalesBills;
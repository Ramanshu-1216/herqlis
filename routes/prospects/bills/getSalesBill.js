const salesBillModel = require('../../../models/salesBill');

const getSalesBill = ( req, res ) => {
    const billId = req.params.billId;
    salesBillModel.find({
        _id: billId
    }).then((resp1) => {
        res.send({
            'message': 'Bill',
            'data': resp1
        });
    } ).catch((er1) => {
        res.send(er1);
    });
}

module.exports = getSalesBill;
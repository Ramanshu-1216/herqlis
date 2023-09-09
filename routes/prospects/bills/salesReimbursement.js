const salesBillModel = require('../../../models/salesBill');

const salesReimbursement = (req, res) => {
    const reimbursedAmount = req.body.reimbursedAmount;
    const billId = req.params.billId;
    const status = req.body.status;
    salesBillModel.updateOne({
        _id: billId
    }, {
        reimbursedAmount: reimbursedAmount,
        reimbursementStatus: status
    }).then((resp1) => {
        res.send({
            'message': 'Bill reimbursed',
            'data': resp1
        });
    }).catch((er1) => {
        res.send(er1);
    })
}

module.exports = salesReimbursement;
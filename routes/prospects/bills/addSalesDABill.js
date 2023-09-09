const salesBillModel = require('../../../models/salesBill');
const addSalesBill = (req, res) => {
    let billm = new salesBillModel();
    billm.amount = req.body.amount;
    billm.description = req.body.description;
    billm.reimbursementStatus = req.body.reimbursementStatus;
    billm.salesId = req.body.salesId;
    billm.userId = req.body.userId;
    billm.dateData = new Date();
    billm
    .save()
    .then((resp1) => {
        res.send({
        message: 'Bill added',
        data: resp1
        });
    })
    .catch((er) => {
        res.send(er);
    });
}
module.exports = addSalesBill;
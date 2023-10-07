const serviceModel = require('../../models/service');
const updateService = (req, res) => {
    const id = req.body.id;
    const serviceType = req.body.serviceType;
    const location = req.body.location;
    const requestDate = req.body.requestDate;
    const acceptenceDate = req.body.acceptenceDate;
    const completionDate = req.body.completionDate;
    const warranty = req.body.warranty;
    const issueDetail = req.body.issueDetail;
    const issueDescription = req.body.issueDescription
    const serviceCost = req.body.serviceCost;
    const clientDetails = req.body.clientDetails;
    const startDate = req.body.startDate;
    const status = req.body.status;
    const serviceFeedback = req.body.serviceFeedback;
    const userId = req.body.userId;
    const advance = req.body.advance;
    const isPublic = req.body.isPublic;

    serviceModel.updateOne({
        _id: id
    }, {
        serviceType: serviceType,
        location: location,
        requestDate: requestDate,
        acceptenceDate: acceptenceDate,
        completionDate: completionDate,
        warranty: warranty,
        issueDetail: issueDetail,
        issueDescription: issueDescription,
        serviceCost: serviceCost,
        clientDetails: clientDetails,
        startDate: startDate,
        status: status,
        serviceFeedback: serviceFeedback,
        userId: userId,
        advance: advance,
        isPublic: isPublic
    }).then((resp1) => {
        res.status(200).send({
            'message': 'Service data updated'
        });
    }).catch((er1) => {
        res.status(500).send(er1);
    })
}

module.exports = updateService;
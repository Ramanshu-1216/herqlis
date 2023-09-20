const { response } = require('express');
const ProspectModel = require('../../models/prospect');
const statuses = ['Upcoming', 'Ongoing', 'Completed', 'Closed'];
const platforms = ['Buying', 'Working', 'Market', 'Universe'];
const models = ['HQ-50', 'HQ-70', 'HQ-140', 'HQ-220'];

const modifyProspect = (req, res) => {
    // try{
        const prospectId = req.params.id;
        const {name, firm, contact, address, email, assignedTo, buyerHistory, prospectDetails, platformDetails, modelDetails, call, status, assignedFrom, finances} = req.body;
        var prospect = {prospectDetails: {}};
        ProspectModel.findOne({'_id': prospectId}).then((item) => {
            if(item){
                prospect = item;
                if(statuses[status] == 'Closed'){
                    res.status(500).json({
                        message: 'Deal is closed',
                        error: 'Can not change data',
                    });
                    return;
                }
                if(name){
                    prospect['name'] = name;
                }
                if(firm){
                    prospect['firm'] = firm;
                }
                if(contact){
                    prospect['contact'] = contact;
                }
                if(address){
                    prospect['address'] = address;
                }
                if(email){
                    prospect['email'] = email;
                }
                if(assignedTo){
                    prospect['assignedTo'] = assignedTo;
                    prospect['assignedOn'] = new Date();
                }
                if(assignedFrom){
                    prospect['assignedFrom'] = assignedFrom;
                }
                if(buyerHistory){
                    prospect['prospectDetails']['buyerHistory'] = buyerHistory;
                }
                if(platformDetails){
                    prospect['prospectDetails']['platformDetails'] = platformDetails;
                }
                if(modelDetails){
                    prospect['prospectDetails']['modelDetails'] = modelDetails;
                }
                if(status){
                    prospect['status'] = statuses[status];
                }
                if(finances){
                    prospect['prospectDetails']['finances'] = finances;
                }
                if(call){
                    ProspectModel.findOne({
                        _id: prospectId,
                    }).then((response) => {
                        let found = false;
                        for(let i = 0; i < response.call.length; i++){
                            if(response.call[i]._id == call._id){
                                found = true;
                                response.call[i] = call;
                                response.call[i].prospect = {
                                    name: JSON.stringify(response),
        
                                };
                                response.save();
                                break;
                            }
                        }
                        if(!found){
                            response.call.push(call);
                            response.save();
                        }
                    });
                }
                ProspectModel.updateOne({
                    _id: prospectId,
                }, {
                    '$set': prospect,
                    // '$push': {'call': call},
                }).then((response) => {
                    if(response.acknowledged){
                        res.status(200).json({
                            message: 'Prospect modified',
                            data: response,
                        });
                    }
                    else{
                        res.status(201).json({
                            message: 'Prospect not modified',
                            error: response,
                        });
                    }
                }).catch((error) => {
                    res.status(500).json({
                        message: 'Something went wrong',
                        error: error,
                    });
                });
            }
            else{
                res.status(400).json({
                    message: 'SalesId not found',
                    error: 'SalesId: ' + prospectId,
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    // }
    // catch(error){
    //     res.status(500).json({
    //         message: 'Something went wrong',
    //         error: error,
    //     });
    // }
}
module.exports = modifyProspect;
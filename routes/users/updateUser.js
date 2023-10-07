const userModel = require('../../models/user');
const updateUser = (req, res) => {
    const name = req.body.name;
    const mobileNum = req.body.mobileNum;
    const email = req.body.email;
    const age = req.body.age;
    const userServices = req.body.userServices;
    const servicesUserCanDo = req.body.servicesUserCanDo;
    const billsToReimburse = req.body.billsToReimburse;
    const gender = req.body.gender;
    const speciality = req.body.speciality;
    const address = req.body.address;
    const location = req.body.location;
    const password = req.body.password;
    const id = req.body.id;
    userModel.updateOne({
        _id: id
    }, {
        name: name,
        mobileNum: mobileNum,
        email: email,
        age: age,
        userServices: userServices,
        servicesUserCanDo: servicesUserCanDo,
        billsToReimburse: billsToReimburse,
        gender: gender,
        speciality: speciality,
        address: address,
        location: location,
        password: password
    }).then((resp1) => {
        res.status(200).send({
            'message': 'User updated'
        });
    }).catch((er1) => {
        res.status(500).send(er1);
    })

}

module.exports = updateUser;
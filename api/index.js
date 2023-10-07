const express = require('express');
const signup = require('../routes/users/signup');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");


const axios = require("axios");
app.use(cors({
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ]
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.text());
const mongoose = require('mongoose');
const getService = require('../routes/services/getService');
const addFeedback = require('../routes/services/addFeedBack');
const getServices = require('../routes/services/getServices');
const deleteService = require('../routes/services/deleteService');
const getServiceMen = require('../routes/services/getServicemen');
const getUserServices = require('../routes/services/getUserServices');
const addOtp = require('../routes/otp/addOtp');
const login = require('../routes/users/login');
const addService = require('../routes/services/addService');
const updateService = require('../routes/services/updateService');
const serviceAllocation = require('../routes/services/serviceAllocation');
const addBill = require('../routes/bills/addBill');
const getBills = require('../routes/bills/getBills');
const usersBills = require('../routes/bills/usersBills');
const getBill = require('../routes/bills/getBill');
const reimbursement = require('../routes/bills/reimbursement');
const addStartDate = require('../routes/services/addStartdate');
const addCompletetion = require('../routes/services/addCompletion');
const updateStatus = require('../routes/services/updateStatus');
const db = "mongodb+srv://pratik:pratik@cluster0.dowzjwv.mongodb.net/?retryWrites=true&w=majority";
const multer = require('multer');
const billModel = require('../models/bill');
const addDailyAllowence = require('../routes/dailyallowence/calculateTimeDistance');
const deleteBill = require('../routes/bills/deleteBill');
const deleteUser = require('../routes/users/deleteUser');
const addDABill = require('../routes/bills/addDABill');
const serviceModel = require('../models/service');
const addProspect = require('../routes/prospects/addProspect');
const modifyProspect = require('../routes/prospects/modifyProspect');
const getProspect = require('../routes/prospects/getProspect');
const getAllProspect = require('../routes/prospects/getAllProspect');
const getAllProspects = require('../routes/prospects/getAllProspects');
const assignProspect = require('../routes/prospects/assignProspect');
const deleteProspect = require('../routes/prospects/deleteProspect');
const addSalesBill = require('../routes/prospects/bills/addSalesBill');
const getSalesBills = require('../routes/prospects/bills/getSalesBills');
const usersSalesBills = require('../routes/prospects/bills/usersSalesBills');
const getSalesBill = require('../routes/prospects/bills/getSalesBill');
const salesReimbursement = require('../routes/prospects/bills/salesReimbursement');
const deleteSalesBill = require('../routes/prospects/bills/deleteSalesBill');
const addSalesDABill = require('../routes/prospects/bills/addSalesDABill');
const updateUser = require('../routes/users/updateUser.js');

const salesBillModel = require('../models/salesBill');
const prospectModel = require('../models/prospect');
const userModel = require('../models/user');

// const sendOTP = require('../routes/otp/sendOTP');
// const verifyOTP = require('../routes/otp/verifyOTP');
// const Cloudupld = require('../test');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'ddcituqpc',
    api_key: '575793552761264',
    api_secret: 'VrE5wG2lYuobc0S5atbZPe3PhO4',
    secure: true
})
const upload = multer({ storage: multer.memoryStorage() })
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection established!!');
}).catch((er) => {
    console.log(er.message);
});

app.get('/', (req, res) => {
    res.send('Welcome');
});
app.post('/signup', (req, res) => {//
    signup(req, res);
});
app.post('/login', (req, res) => {//
    login(req, res);
});
//service
app.get('/service/:serviceId', (req, res) => {//
    getService(req, res);
});
app.get('/services', (req, res) => {//
    getServices(req, res)
});
app.delete('/service/:serviceId', (req, res) => {
    deleteService(req, res);
});
app.get('/servicemen', (req, res) => {//
    getServiceMen(req, res);
});
app.delete('/serviceman/:id', (req, res) => {
    deleteUser(req, res)
})
app.post('/service', (req, res) => {//
    addService(req, res);
});
app.put('/service/:serviceId', (req, res) => {
    updateService(req, res);
})
app.get('/services/:userId', (req, res) => {
    getUserServices(req, res);
});
app.put('/allocation/:serviceId', (req, res) => {
    serviceAllocation(req, res);
});
app.put('/startdate/:serviceId', (req, res) => {
    addStartDate(req, res);
});
app.put('/completetiondate/:serviceId', (req, res) => {
    addCompletetion(req, res);
});
app.put('/feedback/:serviceId', (req, res) => {
    addFeedback(req, res);
});
app.put('/status/:serviceId', (req, res) => {
    updateStatus(req, res);
});
app.put('/advance/:serviceId', (req, res) => {
    const serviceId = req.params.serviceId;
    const advance = req.body.advance;
    serviceModel.updateOne({
        _id: serviceId
    }, {
        advance: advance
    }).then((resp1) => {
        res.send({
            'message': 'advance updated',
            'data': resp1
        })
    }).catch((er1) => {
        res.send(er1);
    })

    module.exports = addCompletetion;
})

app.put('/distance/:serviceId', (req, res) => {
    const serviceId = req.params.serviceId;
    serviceModel.updateOne({
        _id: serviceId,
    }, {
        '$set': {
            'da.distance': req.body.distance,
        }
    }).then((response) => {
        res.send({
            'message': 'Distance Updated',
            'data': response,
        })
    }).catch((error) => {
        res.send({
            'message': 'Distance not updated',
            'data': error,
        })
    })
})

app.post('/da', (req, res) => {
    const lat1 = req.body.lat1;
    const long1 = req.body.long1;
    const lat2 = req.body.lat2;
    const long2 = req.body.long2;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const lat3 = req.body.lat3;
    const long3 = req.body.long3;
    const lat4 = req.body.lat4;
    const long4 = req.body.long4;

    const serviceId = req.body.serviceId;
    const isPublic = req.body.isPublic;
    const salesId = req.body.salesId;
    if (serviceId) {

        serviceModel.findOne({ _id: serviceId }).then((service) => {
            const cordinates = {
                start: {
                    lat: lat1,
                    long: long1,
                },
                departure: {
                    lat: lat2,
                    long: long2,
                },
                end: {
                    lat: lat2,
                    long: long2,
                },
                returned: {
                    lat: lat3,
                    long: long3,
                }
            }
            service.locationCordinates = cordinates;
            var url = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?" + "travelMode=driving" + "&" + "destinations=" + lat2 + "," + long2 + "&" + "origins=" + lat1 + "," + long1 + "&" + "&" + "key=AvmrNFJ3BmYB3ZpIamL7LvUDasyAt9L2HL-qu44vSkTEjQex7_VcDWIUEeERKrkk"
            axios.get(url).then((res1) => {
                var distance = 0;
                distance = res1.data.resourceSets[0].resources[0].results[0].travelDistance;
                var url1 = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?" + "travelMode=driving" + "&" + "destinations=" + lat3 + "," + long3 + "&" + "origins=" + lat2 + "," + long2 + "&" + "&" + "key=AvmrNFJ3BmYB3ZpIamL7LvUDasyAt9L2HL-qu44vSkTEjQex7_VcDWIUEeERKrkk";
                axios.get(url1).then((res2) => {
                    var url2 = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?" + "travelMode=driving" + "&" + "destinations=" + lat3 + "," + long3 + "&" + "origins=" + lat4 + "," + long4 + "&" + "&" + "key=AvmrNFJ3BmYB3ZpIamL7LvUDasyAt9L2HL-qu44vSkTEjQex7_VcDWIUEeERKrkk";
                    distance += res2.data.resourceSets[0].resources[0].results[0].travelDistance;
                    axios.get(url2).then((res3) => {
                        distance += res3.data.resourceSets[0].resources[0].results[0].travelDistance;
                        const timeDifference = Math.abs(endTime - startTime);
                        const hoursDifference = timeDifference / (1000 * 60 * 60);
                        const multipleOfTwelve = Math.floor(hoursDifference / 12);
                        const costForTime = multipleOfTwelve * 150;
                        const multipleOfHundred = Math.floor(distance / 100);
                        const costForDistance = multipleOfHundred * 150;
                        const da = {
                            distance: String(distance),
                        }
                        service.da = da;;
                        service.save().then((res0) => {
                            if (isPublic) {
                                res.send({ petrolCost: Math.abs(distance * 2.5), daCost: Math.abs(Math.max(costForTime, costForDistance)), distance: distance });
                                return;
                            }
                            res.send({ daCost: Math.abs(Math.max(costForTime, costForDistance)), distance: distance });
                        }).catch((error) => {
                            console.error(error);
                            return;
                        });
                    }).catch((error) => {
                        console.log(error);
                        return;
                    })

                }).catch((err) => {
                    console.log(err);
                    return;
                })
            }).catch((err) => {
                console.log(err);
                res.send(err);
            });
        }).catch((error) => {
            res.send(error);
            return;
        });
    }
    else if (salesId) {
        prospectModel.findOne({ _id: salesId }).then((sales) => {
            console.log(sales);
            const cordinates = {
                departure: {
                    lat: lat1,
                    long: long1,
                },
                start: {
                    lat: lat2,
                    long: long2,
                },
                end: {
                    lat: lat3,
                    long: long3,
                },
                returned: {
                    lat: lat4,
                    long: long4,
                }
            }
            sales.locationCordinates = cordinates;
            var url = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?" + "travelMode=driving" + "&" + "destinations=" + lat2 + "," + long2 + "&" + "origins=" + lat1 + "," + long1 + "&" + "&" + "key=AvmrNFJ3BmYB3ZpIamL7LvUDasyAt9L2HL-qu44vSkTEjQex7_VcDWIUEeERKrkk"
            axios.get(url).then((res1) => {
                console.log(res1.data.resourceSets[0].resources[0].results[0].travelDistance);
                var distance = 0;
                distance = res1.data.resourceSets[0].resources[0].results[0].travelDistance;
                var url1 = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?" + "travelMode=driving" + "&" + "destinations=" + lat3 + "," + long3 + "&" + "origins=" + lat2 + "," + long2 + "&" + "&" + "key=AvmrNFJ3BmYB3ZpIamL7LvUDasyAt9L2HL-qu44vSkTEjQex7_VcDWIUEeERKrkk";
                axios.get(url1).then((res2) => {
                    var url2 = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?" + "travelMode=driving" + "&" + "destinations=" + lat3 + "," + long3 + "&" + "origins=" + lat4 + "," + long4 + "&" + "&" + "key=AvmrNFJ3BmYB3ZpIamL7LvUDasyAt9L2HL-qu44vSkTEjQex7_VcDWIUEeERKrkk";
                    distance += res2.data.resourceSets[0].resources[0].results[0].travelDistance;
                    axios.get(url2).then((res3) => {
                        distance += res3.data.resourceSets[0].resources[0].results[0].travelDistance;
                        const timeDifference = Math.abs(endTime - startTime);
                        const hoursDifference = timeDifference / (1000 * 60 * 60);
                        const multipleOfTwelve = Math.floor(hoursDifference / 12);
                        const costForTime = multipleOfTwelve * 150;
                        const multipleOfHundred = Math.floor(distance / 100);
                        const costForDistance = multipleOfHundred * 150;
                        const da = {
                            distance: String(distance),
                        }
                        sales.da = da;;
                        sales.save().then((res0) => {
                            if (isPublic) {
                                res.send({ petrolCost: Math.abs(distance * 2.5), daCost: Math.abs(Math.max(costForTime, costForDistance)), distance: distance });
                                return;
                            }
                            res.send({ daCost: Math.abs(Math.max(costForTime, costForDistance)), distance: distance });
                        }).catch((error) => {
                            console.error(error);
                            return;
                        });
                    }).catch((error) => {
                        console.log(error);
                        return;
                    })
                }).catch((err) => {
                    console.log(err);
                    return;
                })
            }).catch((err) => {
                console.log(err);
                res.send(err);
            });
        }).catch((error) => {
            res.send(error);
            return;
        });
    }
});
//otp
app.post('/opt', (req, res) => {
    addOtp(req, res);
});
app.post("/DAbill", (req, res) => {
    addDABill(req, res);
});
//bill

app.post('/bill', upload.single('file'), async (req, res) => {
    try {
        // const bb = new busboy({ headers: req.headers });
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const file = req.file;
        console.log("file 162 :- " + file);
        // Upload file data directly to Cloudinary
        const base64Data = file.buffer.toString('base64');
        //   console.log("file 165 :- "+base64Data);
        await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${base64Data}`
        ).then((resp1) => {
            console.log("resp1 167 :- " + resp1);
            let billm = new billModel();
            console.log("resp1 :127 :- " + resp1);
            billm.imgUrl = resp1.secure_url;
            billm.amount = req.body.amount;
            billm.description = req.body.description;
            billm.reimbursementStatus = req.body.reimbursementStatus;
            billm.serviceId = req.body.serviceId;
            billm.userId = req.body.userId;
            billm.save().then((resp1) => {
                res.send({
                    'message': 'Bill added',
                    'data': resp1
                });
            }).catch((er) => {
                res.send(er);
            });
        }).catch((er1) => {
            res.send(er1);
        })

        //   res.json({ url: cloudinaryUpload.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});


app.get('/bills', (req, res) => {
    getBills(req, res);
});
app.get('/billusr/:userId', (req, res) => {
    usersBills(req, res);
});
app.delete('/bill/:id', (req, res) => {
    deleteBill(req, res);
});
app.get('/bill/:billId', (req, res) => {
    getBill(req, res);
});
app.put('/reimbursement/:billId', (req, res) => {
    reimbursement(req, res);
});
app.post('/otp/sendOTP', (req, res) => {
    sendOTP(req, res);
});
app.get('otp/verifyOTP', (req, res) => {
    verifyOTP(req, res);
});



app.post('/addProspect', (req, res) => {
    addProspect(req, res);
});
app.put('/modifyProspect/:id', (req, res) => {
    modifyProspect(req, res);
});
app.get('/getProspect/:id', (req, res) => {
    getProspect(req, res);
});
app.get('/getAllUserProspects/:id', (req, res) => {
    getAllProspect(req, res);
});
app.get('/getAllProspects', (req, res) => {
    getAllProspects(req, res);
});
app.put('/assignProspect/:id', (req, res) => {
    assignProspect(req, res);
});
app.delete('/deleteProspect/:id', (req, res) => {
    deleteProspect(req, res);
});

app.post('/salesBill', upload.single('file'), async (req, res) => {
    try {
        // const bb = new busboy({ headers: req.headers });
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const file = req.file;
        console.log("file 162 :- " + file);
        // Upload file data directly to Cloudinary
        const base64Data = file.buffer.toString('base64');
        //   console.log("file 165 :- "+base64Data);
        await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${base64Data}`
        ).then((resp1) => {
            console.log("resp1 167 :- " + resp1);
            let billm = new salesBillModel();
            console.log("resp1 :127 :- " + resp1);
            billm.imgUrl = resp1.secure_url;
            billm.amount = req.body.amount;
            billm.description = req.body.description;
            billm.reimbursementStatus = req.body.reimbursementStatus;
            billm.salesId = req.body.salesId;
            billm.userId = req.body.userId;
            billm.save().then((resp1) => {
                res.send({
                    'message': 'Bill added',
                    'data': resp1
                });
            }).catch((er) => {
                res.send(er);
            });
        }).catch((er1) => {
            res.send(er1);
        })

        //   res.json({ url: cloudinaryUpload.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});
app.get('/salesBills', (req, res) => {
    getSalesBills(req, res);
});
app.get('/salesBillusr/:userId', (req, res) => {
    usersSalesBills(req, res);
});
app.delete('/salesBill/:id', (req, res) => {
    deleteSalesBill(req, res);
});
app.get('/salesBill/:billId', (req, res) => {
    getSalesBill(req, res);
});
app.put('/salesReimbursement/:billId', (req, res) => {
    salesReimbursement(req, res);
});
app.post("/SalesDAbill", (req, res) => {
    addSalesDABill(req, res);
});
app.put('/user/', (req, res) => {
    updateService(req, res);
})
// app.post('/test', upload.single('file'), (req, res) => {
//     let cld = new Cloudupld("szuxglwu", "dl3ncyhm7");
//     console.log("welcome " + Object.keys(req.body));
//     let file = req.file;
//     const base64Data = file.buffer.toString('base64');
//     console.log("file :- 172 :- "+Object.keys(file));
//     res.send(cld.upld(file.buffer));
// })
// userModel.find({}).then((res) => {
//     for(let i = 0; i < res.length; i++){
//         res[i].userId = generateSixDigitID(res[i]._id);
//         res[i].save().then((res) => {
//             console.log(res.userId);
//         })
//     }
// })
app.listen(3001, () => {
    console.log('Server started at 3001');
})

// function generateSixDigitID(objectId) {
//     const hexString = objectId.toHexString();
//     const integerID = parseInt(hexString, 16);
//     const sixDigitID = (integerID % 900000) + 100000; // Ensure it's a 6-digit number
//     return sixDigitID.toString();
// }

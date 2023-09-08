const ProspectModel = require('../../models/prospect');
const deleteProspect = (req, res) => {
    const prospectId = req.params.id;

    ProspectModel.deleteOne({_id: prospectId}).then((response) => {
        res.status(200).json({message: "Prospect deleted", data: response});
    }).catch((error) => {
        res.status(500).json({message: "Prospect not deleted", error: error});
    });
}
module.exports = deleteProspect;
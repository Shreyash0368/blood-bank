const express = require('express');
const router = express.Router();
const BloodUnit = require('../models/BloodUnit')

router.post('/createUnit', async (req, res) => {
    const {blood_type, donor_name, donor_id, donor_sex, date} = req.body;

    try {
        const unit = new BloodUnit({blood_type, donor_name, donor_id, donor_sex, date});
        const savedUnit = await unit.save();

        res.status(201).json({success: true, savedUnit});
    } catch (error) {
        res.status(400).json({success: false, error});
    }
})

router.get('/getUnitsByType', async (req, res) => {
    const type = req.body.type;

    try {
        const units = await BloodUnit.find({blood_type: type});
        res.status(201).json({success: true, units: units}).send();
    } catch (error) {
        res.status(400).json({success: false, error});
    }
})

router.get('/getUnitsById', async (req, res) => {
    const id = req.body.donor_id;                             

    try {
        const units = await BloodUnit.find({donor_id: id});
        res.status(201).json({success: true, units: units}).send();
    } catch (error) {
        res.status(400).json({success: false, error});
    }
})

module.exports = router;
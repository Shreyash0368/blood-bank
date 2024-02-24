const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');
const jwt = require('jsonwebtoken');
const fetchDonor = require('../middleware/fetchDonor')


router.post('/createDonor', async(req, res) => {
    const {name, email, blood_type, sex, DOB} = req.body;

    try {
        const newDonor = new Donor({name, email, blood_type, sex, DOB, });
        const savedDonor = await newDonor.save();

        const data = {
            donorid : savedDonor.id
        }

        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.status(200).json({success: true, token});
    } catch (error) {
        res.status(400).json({success: false, error});
    }
})

router.post('/login', async (req, res) => {
    const {email, name, DOB} = req.body;

    try {
        const donor = await Donor.find({"email": email, "DOB": DOB});
        if (!donor) res.sendStatus(401);

        res.status(200).json({success: true, donor}).send();
    } catch (error) {
        res.status(400).json({success: false, error}).send();        
    }
})

router.get('/getDonor', fetchDonor, async(req, res) => {
    const donorid = req.donorid;

    try {
        const donor = await  Donor.findById(donorid);
        res.status(201).json({success: true, donor}).send();
    } catch (error) {
        res.status(401).json({success: false, error}).send();        
    }
})

module.exports = router;
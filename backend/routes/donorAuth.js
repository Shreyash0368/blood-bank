const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchDonor = require('../middleware/fetchDonor')


router.post('/createDonor', async(req, res) => {
    const {name, email, blood_type, sex, DOB, password} = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    try {
        const newDonor = new Donor({name, email, blood_type, sex, DOB, password: hashedPass});
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
    const {email, password} = req.body;

    try {
        const donor = await Donor.findOne({email});
        if (!donor) res.sendStatus(401);        
        if (!bcrypt.compareSync(password, donor.password)) res.sendStatus(401);
        
        const data = {
            donor_id : donor.id
        }
        const auth = jwt.sign(data, process.env.JWT_SECRET);
 
        res.status(200).json({success: true, donorAuth: auth}).send();
    } catch (error) {
        res.status(500).json({success: false, error}).send();        
    }
})

router.get('/getDonor', fetchDonor, async(req, res) => {
    const donorid = req.donorid;

    try {
        const donor = await  Donor.findById(donorid).select("-password");
        res.status(201).json({success: true, donor}).send();
    } catch (error) {
        res.status(401).json({success: false, error}).send();        
    }
})

module.exports = router;
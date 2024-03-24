const express = require('express');
const router = express.Router();
const Appointments = require('../models/Appointments')
const fetchDonor = require('../middleware/fetchDonor')

router.post('/addAppointment', fetchDonor, async (req, res) => {
    const donor_id = req.donorid;
    const {date, donor_name} = req.body;

    try {
        const appoint = new Appointments({date, donor_id, donor_name});
        const savedAppoint = await appoint.save();
        res.status(201).json({success: true, savedAppoint});
    } catch (error) {
        res.status(500).json({success: false, error});        
    }

})

router.get('/getAppointment',fetchDonor, async (req, res) => {
    const donor_id = req.donor_id;
    try {
        const appointment = await Appointments.find({donor_id});
        res.status(200).json({success: true, appointment});        
    } catch (error) {
        res.status(500).json({success: false, error});        
    }
}) 

module.exports = router
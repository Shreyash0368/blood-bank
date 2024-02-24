const express = require('express');
const router = express.Router();
const Appointments = require('../models/Appointments')

router.post('/addAppointment', async (req, res) => {
    const {date, donor_id, donor_name} = req.body;

    try {
        const appoint = new Appointments({date, donor_id, donor_name});
        const savedAppoint = await appoint.save();
        res.status(201).json({success: true, savedAppoint});
    } catch (error) {
        res.status(500).json({success: false, error});        
    }

})

router.get('/getAppointment', async (req, res) => {
    const donor_id = req.body.donor_id;
    try {
        const appointment = await Appointments.find({donor_id});
        res.status(200).json({success: true, appointment});        
    } catch (error) {
        res.status(500).json({success: false, error});        
    }
}) 

module.exports = router
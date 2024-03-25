const express = require('express');
const router = express.Router();
const Requests = require('../models/Requests')
const fetchStaff = require('../middleware/fetchStaff')

router.post('/addRequest',fetchStaff, async (req, res) => {
    const staff_id = req.userid;
    const role = req.role;

    if (role !== 'staff') {
        res.status(422).json({success: false, message: "Invalid Auth Token"}).send();  
        return;
    }
    const {blood_type, units} = req.body;

    try {
        const request = new Requests({blood_type, units, staff_id});
        const savedReq = await request.save();
        res.status(201).json({success: true, savedReq});
    } catch (error) {
        res.status(500).json({success: false, error});        
    }

})

router.get('/getAll', async (req, res) => {
    try {
        const requests = await Requests.find();
        res.status(200).json({success: true, requests});        
    } catch (error) {
        res.status(500).json({success: false, error});        
    }
}) 

module.exports = router;
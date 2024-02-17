const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Staff = require('../models/Staff');

router.post('/signup', async (req, res) => {
    //TODO: run validator 

    try {
        let {name, email, password} = req.body;
        password = await bcrypt.hash(password, 10);  // hash password      

        const newStaff = new Staff({name, email, password});
        const savedStaff = await newStaff.save();

        const data = {
            userid: savedStaff.id
        }
        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.status(201).json({success: true, token}).send();
    } catch (error) {
        res.status(500).json({success: false, message: error}).send();
    }
})

router.post('/login', async (req, res) => {
    //TODO: run validator 

    try {
        let {email, password} = req.body;
        

        const staff = await Staff.findOne({email});

        if (!staff) {
            res.status(401).json({success: false, message: "Invalid Credentials"});
        }

        const result = bcrypt.compare(password, staff.password);

        if (!result) res.status(401).json({success: false, message: "Invalid Credentials"});

        const data = {
            userid: staff.id
        }
        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.status(201).json({success: true, token}).send();
    } catch (error) {
        res.status(500).json({success: false, message: error}).send();
    }
})

module.exports = router
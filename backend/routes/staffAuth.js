const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Staff = require('../models/Staff');
const decodeAuth = require('../middleware/decodeAuth');

router.post('/signup', async (req, res) => {
    //TODO: run validator 

    try {
        let {name, email, password} = req.body;
        password = await bcrypt.hash(password, 10);  // hash password      

        const newStaff = new Staff({name, email, password});
        const savedStaff = await newStaff.save();

        const data = {
            user_id: savedStaff.id,
            role: "staff",
            iat: Date.now(),
            exp: Date.now() + process.env.EXPIRY_TIME
        }
        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.status(201).send({success: true, token});
    } catch (error) {
        res.status(500).send({success: false, message: error});
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

        const result = await bcrypt.compare(password, staff.password);

        if (!result) res.status(401).json({success: false, message: "Invalid Credentials"});

        const data = {
            user_id: staff.id,
            role: "staff",
            iat: Date.now(),
            exp: Date.now() + parseInt(process.env.EXPIRY_TIME)
        }
        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.status(201).json({success: true, token}).send();
    } catch (error) {
        res.status(500).json({success: false, message: error}).send();
    }
})

router.get('/getStaff', decodeAuth, async (req, res) => {
    let userid = req.user_id;
    try {
        const user = await Staff.findById(userid).select("-password");
        res.status(201).json({success: true, user, role: req.role}).send();
    } catch (error) {
        res.status(400).json({success: false, error}).send();        
    }
})

module.exports = router
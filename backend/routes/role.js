const express = require('express');
const router = express.Router();
const decodeAuth = require("../middleware/decodeAuth");

router.get('/getRole', decodeAuth, (req, res) => {
    const role = req.role;
    res.status(201).send({role});
})

module.exports = router
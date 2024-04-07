const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const decodeAuth = require("../middleware/decodeAuth");

router.post("/createDonor", async (req, res) => {
  const { name, email, blood_type, sex, DOB, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);

  try {
    const newDonor = new Donor({
      name,
      email,
      blood_type,
      sex,
      DOB,
      password: hashedPass,
    });
    const savedDonor = await newDonor.save();

    const data = {
      user_id: savedDonor.id,
      role: "donor",
      iat: Date.now(),
      exp: Date.now() + parseInt(process.env.EXPIRY_TIME),
    };

    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const donor = await Donor.findOne({ email });
    if (!donor) {
      res.status(401).send({message: 'no user found'});
      return;
    }
    if (!bcrypt.compareSync(password, donor.password)) {
      res.status(401).send({message: 'invalid auth'});
      return;
    }

    const data = {
      user_id: donor.id,
      role: "donor",
      iat: Date.now(),
      exp: Date.now() + parseInt(process.env.EXPIRY_TIME),
    };
    const token = jwt.sign(data, process.env.JWT_SECRET);

    res.status(200).json({ success: true, token }).send();
  } catch (error) {
    res.status(500).json({ success: false, error }).send();
  }
});

router.get("/getDonor", decodeAuth, async (req, res) => {
  const donorid = req.user_id;

  try {
    const donor = await Donor.findById(donorid).select("-password");
    res.status(201).json({ success: true, donor, role: req.role }).send();
  } catch (error) {
    res.status(401).json({ success: false, error }).send();
  }
});

module.exports = router;

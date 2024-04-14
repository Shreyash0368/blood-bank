const express = require("express");
const router = express.Router();
const Appointments = require("../models/Appointments");
const Donor = require("../models/Donor");
const decodeAuth = require("../middleware/decodeAuth");

router.post("/addAppointment", decodeAuth, async (req, res) => {
  const donor_id = req.user_id;
  const { date, donor_name, units, blood_type, sex } = req.body;

  try {
    const appoint = new Appointments({
      date,
      donor_id,
      donor_name,
      units,
      blood_type,
      sex
    });
    const savedAppoint = await appoint.save();
    res.status(201).send({ success: true, savedAppoint });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});

router.patch("/confirmAppointment/:appointmentId", decodeAuth, async (req, res) => {
  const { appointmentId } = req.params;

  if (req.role !== "staff") {
    res.status(498).send({ message: "Invalid Token" });
    return;
  }

  try {
    const appointment = await Appointments.findById(appointmentId);

    if (!appointment) {
      return res.status(404).send({ message: "Appointment not found" });
    }

    const donor = await Donor.findById(appointment.donor_id);

    if (!donor) {
      return res.status(404).send({ message: "Donor not found" });
    }

    donor.donations.push({
      appointmentId,
      units: appointment.units,
      date: appointment.date,
    });
    await donor.save();

    res.status(201).send({ message: "donation succesfully confirmed" });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete("/deleteAppointment/:appointmentId", decodeAuth, async (req, res) => {
    const { appointmentId } = req.params;
    
    if (req.role !== "staff") {
      res.status(498).send({ message: "Invalid Token" });
      return;
    }

    try {
      const deletedAppointment = await Appointments.findByIdAndDelete(
        appointmentId
      );

      if (!deletedAppointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      return res.status(201).send({ message: "Appointment succesffuly deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
  }
);

router.get("/getAppointment", decodeAuth, async (req, res) => {
  const donor_id = req.user_id;
  try {
    const appointmentsForDonor = await Appointments.find({ donor_id });
    res.status(200).send({ success: true, appointments: appointmentsForDonor });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});

router.get("/getAll", decodeAuth, async (req, res) => {
  const role = req.role;
  if (role !== "staff") {
    res.status(402).send({ message: "Invalid Auth Token" });
    return;
  }

  try {
    const allAppointments = await Appointments.find();
    res.status(200).send({ success: true, allAppointments });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

module.exports = router;

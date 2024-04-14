import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserData,
  fetchDonor,
  setAuth,
  setUserFromLocal,
  selectUserId,
} from "../userSlice.js";
import { selectPending, getDonorAppointments, selectAppointmentStatus } from "../../appointments/appointmentsSlice.js";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner.jsx";
import DonationCard from "../../appointments/DonationCard.jsx";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AppointmentCard from "../../appointments/AppointmentCard.jsx";



export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("bloodBankAuth") !== null) {
      dispatch(setAuth(localStorage.getItem("bloodBankAuth")));
      if (appointmentStatus !== 'fullfilled') dispatch(getDonorAppointments(localStorage.getItem("bloodBankAuth")));
      if (localStorage.getItem("userData") === null) {
        dispatch(fetchDonor(localStorage.getItem("bloodBankAuth")));
      } else {
        dispatch(setUserFromLocal());
      }
    } else {
      navigate("/");
    }
  }, []);
  const appointmentStatus = useSelector(selectAppointmentStatus);
  const userData = useSelector(selectUserData);
  const donor_id = useSelector(selectUserId);
  const pending = useSelector(selectPending);
  let isLoading = !userData;

  return (
    <>
      {isLoading ? (
        <h1>
          <Spinner />
        </h1>
      ) : (
        <div>
          <div style={{ display: "flex", padding: "20px" }}>
            <div style={{ width: "80%" }}>
              <h2 style={{ textAlign: "left" }}>Name: {userData.name}</h2>
              <h2 style={{ textAlign: "left" }}>Email: {userData.email}</h2>
              <h2 style={{ textAlign: "left" }}>
                Blood Type: {userData.blood_type}
              </h2>
              <h2 style={{ textAlign: "left" }}>
                DOB (dd/mm/yyyy):{" "}
                {new Date(userData.DOB).toLocaleDateString("en-GB")}
              </h2>
              <h2 style={{ textAlign: "left" }}>Sex: {userData.sex}</h2>
            </div>
            <div>
              <img
                style={{ maxHeight: "250px" }}
                src="/assets/user.png"
                alt="user badge"
              />
            </div>
          </div>
          <div style={{ textAlign: "left" }}>
            <Button
              color="success"
              variant="contained"
              onClick={() => {
                navigate(`/donor/${donor_id}/bookAppointment`);
              }}
            >
              Book A Donation Appointment!!!
            </Button>
          </div>
          <div>
            <h1 style={{ textAlign: "left" }}>Upcoming Appointments</h1>
            <Grid container spacing={3}>
              {pending.map((appointment) => (
                <Grid item key={appointment._id} xs={4}>
                  <AppointmentCard appointment={appointment} />
                </Grid>
              ))}
            </Grid>
            <h1 style={{ textAlign: "left" }}>Past Donations</h1>
            <Grid container spacing={3}>
              {userData.donations.map((donation) => (
                <Grid item key={donation.appointmentId} xs={4}>
                  <DonationCard donation={donation} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}
    </>
  );
}

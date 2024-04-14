import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import {
  selectUserData,
  setAuth,
  setUserFromLocal,
  fetchStaff,
} from "../../user/userSlice.js";
import {
  selectPending,
  getAllAppointments,
  selectAppointmentStatus,
} from "../../appointments/appointmentsSlice.js";
import { createUnit } from "../../bloddUnits/bloodUnitsSlice.js";
import Spinner from "../../../components/Spinner.jsx";
import AppointmentCard from "../../appointments/AppointmentCard.jsx";

export default function StaffProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("bloodBankAuth") !== null) {
      dispatch(setAuth(localStorage.getItem("bloodBankAuth")));
      if (appointmentStatus !== "fullfilled")
        dispatch(getAllAppointments(localStorage.getItem("bloodBankAuth")));
      if (localStorage.getItem("userData") === null) {
        dispatch(fetchStaff(localStorage.getItem("bloodBankAuth")));
      } else {
        dispatch(setUserFromLocal());
      }
    } else {
      navigate("/");
    }
  }, []);
  const userData = useSelector(selectUserData);
  const appointments = useSelector(selectPending);
  const appointmentStatus = useSelector(selectAppointmentStatus);
  let isLoading = !userData;

  const handleConfirm = async (appointmentId) => {
    const staffAuth = localStorage.getItem("bloodBankAuth");
    if (!staffAuth) return;

    try {
      // adding appointment as donation to donor's profile
      const confirm = await fetch(
        `${
          import.meta.env.VITE_SERVER_PATH
        }/appointments/confirmAppointment/${appointmentId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: staffAuth,
          },
        }
      );

      if (!confirm.ok) {
        console.log(confirm.status, confirm.statusText);
        return;
      }

      // adding bloodunit to the bank
      const appointment = appointments.find((appoint) => appoint._id === appointmentId);
      const { blood_type, donor_name, donor_id, sex, date } = appointment;
      dispatch(createUnit({blood_type, donor_name, donor_id, donor_sex: sex, date}));

      // deleting appointment
      const remove = await fetch(
          `${
            import.meta.env.VITE_SERVER_PATH
          }/appointments/deleteAppointment/${appointmentId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: staffAuth,
            },
          }
        );
  
        if (!remove.ok) {
          console.log(confirm.status, confirm.statusText);
          return;
        }

        location.reload();

    } catch (error) {
      console.log(error);
    }
  };

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
              <h2 style={{ textAlign: "left" }}>Employee ID: {userData._id}</h2>
            </div>
            <div>
              <img
                style={{ maxHeight: "250px" }}
                src="/assets/user.png"
                alt="user badge"
              />
            </div>
          </div>
          <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "left" }}>Confirm Donations</h1>
            <Grid container spacing={3}>
              {appointments.map((appointment) => (
                <Grid item xs={4} key={appointment._id}>
                  <AppointmentCard appointment={appointment} />
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleConfirm(appointment._id);
                    }}
                    style={{ marginTop: "4px" }}
                  >
                    Confirm
                  </Button>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}
    </>
  );
}

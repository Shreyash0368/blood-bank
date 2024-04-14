import React from 'react'

export default function AppointmentCard({ appointment }) {
    return (
      <article
        style={{
          border: "2px solid grey",
          borderRadius: "4px",
          textAlign: "left",
          paddingLeft: "8px",
        }}
      >
        <h4>Appointment Id: {appointment._id}</h4>
        <h4>Donor Id: {appointment.donor_id}</h4>
        <h4>Donor Name: {appointment.donor_name}</h4>
        <h4>Blood Type: {appointment.blood_type}</h4>
        <h4>Date: {new Date(appointment.date).toLocaleDateString("en-GB")}</h4>
        <h4>Sex: {appointment.sex}</h4>
      </article>
    );
  }

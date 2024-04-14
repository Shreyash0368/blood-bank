import React from "react";

export default function DonationCard({ donation }) {
  return (
    <article
      style={{
        border: "2px solid grey",
        borderRadius: "4px",
        textAlign: "left",
        paddingLeft: "8px",
      }}
    >
      <h4>Appointment Id: {donation.appointmentId}</h4>
      <h4>Date: {new Date(donation.date).toLocaleDateString("en-GB")}</h4>
      <h4>Units Donated: {donation.units}</h4>
    </article>
  );
}

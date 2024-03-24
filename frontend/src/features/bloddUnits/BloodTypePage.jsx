import React from "react";
import { useParams } from "react-router-dom";
import { selectByType } from "./bloodUnitsSlice";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { Typography, CardContent, Card } from "@mui/material";

function BloodUnitCard({ bloodUnit }) {
  const { blood_type, date, donor_id, donor_name, donor_sex } = bloodUnit;
  return (
    <Card sx={{ minWidth: 275, margin: "1.5rem", maxWidth: 650 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Name: {donor_name}
        </Typography>
        <Typography marginTop={1} variant="body2" component="div">
          Date of Donation: {new Date(date).toLocaleDateString()} <br />
          Donor-ID: {donor_id} <br />
          Sex: {donor_sex}
        </Typography>
      </CardContent>
    </Card>
  );
}

function EmptyPage() {
  return (
    <>
      <h2>Our volunteers are working hard to collect the units. <br /> Thank you for your Understanding</h2>
    </>
  );
}

export default function BloodTypePage() {
  let content = <Spinner />;
  const { type } = useParams();
  const units = useSelector((state) => selectByType(state, type));
  if (units.length === 0) {
    content = <EmptyPage />
  } else {
    content = units.map((unit) => (
      <BloodUnitCard key={unit._id} bloodUnit={unit} />
    ));
  }
  // console.log(units);
  return (
    <div>
      <h2>List Of Avaialable {type} Units</h2>
      <h3>
        To reserve a unit please contact us at the provided toll-free number
      </h3>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {content}
      </div>
    </div>
  );
}

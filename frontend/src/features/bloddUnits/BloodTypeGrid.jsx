import React from "react";
import {
  Grid,
  Typography,
  Button,
  CardContent,
  CardActions,
  Card,
} from "@mui/material";
import { Link } from "react-router-dom";

const bloodTypeList = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

function BloodTypeCard({ bloodType }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {bloodType}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"> <Link to={`/bloodType/${bloodType}`}> List </Link></Button>
      </CardActions>
    </Card>
  );
}

export default function BloodTypeGrid() {
  return (
    <div style={{ marginTop: "2rem", padding : "0 10px" }} >
      <h2 style={{ textAlign: "left" }}>Choose Required Blood Type</h2>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        padding={5}
      >
        {bloodTypeList.map((type) => (
          <Grid item md={4} xs={12} key={type}>
            <BloodTypeCard bloodType={type} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

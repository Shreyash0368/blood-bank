import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";
import { useDispatch } from "react-redux";
import {fetchDonor, setAuth } from "./userSlice";
import { useNavigate } from "react-router-dom";

const bloodGroupOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

export default function DonorSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bloodGrp, setBloodgrp] = React.useState("");
  const [sex, setSex] = React.useState("");

  const handleBloodGrpChange = (event) => {
    setBloodgrp(event.target.value);
  };
  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const confirm = data.get("confirm-password");
    const DOB = data.get("DOB");
    
    if (confirm !== password) return;
    
    const formData = { name, email, password, blood_type: bloodGrp, sex, DOB };
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_PATH}/donor/createDonor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("signup error");

      const donor = await response.json();
      localStorage.setItem("bloodBankAuth", donor.token);
      dispatch(fetchDonor(donor.token));
      dispatch(setAuth(donor.token));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            type="text"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm-Password"
            type="password"
            id="conform-password"
            autoComplete="current-password"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="blood-grp">Blood Group</InputLabel>
            <Select
              labelId="blood-grp"
              id="bloodgrp"
              value={bloodGrp}
              label="BloodGrp"
              onChange={handleBloodGrpChange}
            >
              {bloodGroupOptions.map((type) => (
                <MenuItem value={type.value} key={type.value}>
                  {type.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="sex">Sex</InputLabel>
            <Select
              labelId="sex"
              id="sex"
              value={sex}
              label="Sex"
              onChange={handleSexChange}
            >
              <MenuItem value={"M"}>M</MenuItem>
              <MenuItem value={"F"}>F</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="DOB">DOB</InputLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              name="DOB"
              type="date"
              id="DOB"
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserData,
  fetchDonor,
  setAuth,
  setUserFromLocal,
} from "../user/userSlice.js";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner.jsx";

export default function AppointmentForm({ match }) {
  const navigate = useNavigate();
  const { donor_id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("bloodBankAuth") !== null) {
      dispatch(setAuth(localStorage.getItem("bloodBankAuth")));
      if (localStorage.getItem("userData") === null) {
        dispatch(fetchDonor(localStorage.getItem("bloodBankAuth")));
      } else {
        dispatch(setUserFromLocal());
      }
    } else {
      navigate("/");
    }
  }, []);
  const userData = useSelector(selectUserData);
  let isLoading = !userData;
  const [units, setUnits] = useState(1);

  const handleUnitsChange = (event) => {
    setUnits(event.target.value);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <div style={{ width: "80%" }}>
            <h2 style={{ textAlign: "left" }}>Name: {userData.name}</h2>
            <h2 style={{ textAlign: "left" }}>Email: {userData.email}</h2>
            <h2 style={{ textAlign: "left" }}>Blood Type: {userData.blood_type}</h2>
            <h2 style={{ textAlign: "left" }}>DOB (dd/mm/yyyy):{" "}{new Date(userData.DOB).toLocaleDateString("en-GB")}</h2>
            <h2 style={{ textAlign: "left" }}>Sex: {userData.sex}</h2>
          </div>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <h2>Appointment Details</h2>
            <FormControl fullWidth>
              <FormLabel id="date" style={{ textAlign: "left" }}>
                Date
              </FormLabel>
              <TextField
                margin="normal"
                required
                id="date"
                min={new Date().toISOString().slice(0, 10)}
                type="date"
                name="date"
              />
            </FormControl>

            <FormControl fullWidth margin="10px 0">
              <FormLabel id="unitCount" style={{ textAlign: "left" }}>
                Units To Donate
              </FormLabel>
              <RadioGroup
                aria-labelledby="unitCount"
                name="unitCount"
                value={units}
                onChange={handleUnitsChange}
                style={{
                  border: "1px solid grey",
                  borderRadius: "4px",
                  padding: "7px",
                }}
              >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
              </RadioGroup>
            </FormControl>

            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Book Appointment
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
}

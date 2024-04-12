import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData, fetchDonor, setAuth, setUserFromLocal, selectUserId } from "../userSlice.js";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner.jsx";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";



export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('bloodBankAuth') !== null) {
      dispatch(setAuth(localStorage.getItem('bloodBankAuth')));
      if (localStorage.getItem('userData') === null ) {
        dispatch(fetchDonor(localStorage.getItem('bloodBankAuth')));
      }
      else {
        dispatch(setUserFromLocal());
      }
    }
    else {
      navigate('/');
    }
  }, [])
  const userData = useSelector(selectUserData);
  const donor_id = useSelector(selectUserId);
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
          <div style={{textAlign: "left"}}>
            <Button color="success" variant="contained" onClick={() => {navigate(`/donor/${donor_id}/bookAppointment`)}}>Book A Donation Appointment!!!</Button>
          </div>
          <div>
            <h1 style={{ textAlign: "left" }}>Past Donations</h1>
            <Grid container spacing={3}></Grid>
          </div>
        </div>
      )}
    </>
  );
}

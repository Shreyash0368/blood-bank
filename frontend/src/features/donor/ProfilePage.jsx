import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { selectDonorData, fetchDonor, setAuth, setDonorFromLocal } from "./userSlice";
import store from "../../app/store.js";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";



export default function ProfilePage() {
  useEffect(() => {
    if (localStorage.getItem('bloodBankAuth') !== null) {
      store.dispatch(setAuth(localStorage.getItem('bloodBankAuth')));
      if (localStorage.getItem('donorData') === null ) {
        store.dispatch(fetchDonor(localStorage.getItem('bloodBankAuth')));
      }
      else {
        store.dispatch(setDonorFromLocal());
      }
    }
  }, [])
  const donorData = useSelector(selectDonorData);
  let isLoading = !donorData;


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
              <h2 style={{ textAlign: "left" }}>Name: {donorData.name}</h2>
              <h2 style={{ textAlign: "left" }}>Email: {donorData.email}</h2>
              <h2 style={{ textAlign: "left" }}>
                Blood Type: {donorData.blood_type}
              </h2>
              <h2 style={{ textAlign: "left" }}>
                DOB (dd/mm/yyyy):{" "}
                {new Date(donorData.DOB).toLocaleDateString("en-GB")}
              </h2>
              <h2 style={{ textAlign: "left" }}>Sex: {donorData.sex}</h2>
            </div>
            <div>
              <img
                style={{ maxHeight: "250px" }}
                src="/assets/user.png"
                alt="user badge"
              />
            </div>
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

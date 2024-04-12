import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { selectUserData, setAuth, setUserFromLocal, fetchStaff } from "../../user/userSlice.js";
import store from "../../../app/store.js";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner.jsx";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";



export default function StaffProfilePage() {
  
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('bloodBankAuth') !== null) {
      store.dispatch(setAuth(localStorage.getItem('bloodBankAuth')));
      if (localStorage.getItem('userData') === null ) {
        store.dispatch(fetchStaff(localStorage.getItem('bloodBankAuth')));
      }
      else {
        store.dispatch(setUserFromLocal());
      }
    }
    else {
      navigate('/');
    }
  }, [])
  const userData = useSelector(selectUserData);
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
          <div>
            <h1 style={{ textAlign: "left" }}>Confirm Donations</h1>
            <Grid container spacing={3}></Grid>
          </div>
        </div>
      )}
    </>
  );
}

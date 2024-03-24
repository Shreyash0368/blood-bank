import "./App.css";
import Navbar from "./components/Navbar";
import BloodTypeGrid from "./features/bloddUnits/BloodTypeGrid";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BloodTypePage from "./features/bloddUnits/BloodTypePage";
import DonorSignUp from "./features/donor/DonorSignup";
import DonorLogin from "./features/donor/DonorLogin";
import StaffLogin from "./features/staff/StaffLogin";

const NotFound = () => {
  // Display a "Page Not Found" message or handle it as needed
  return <h1>404: Not Found</h1>;
};

function App() {
  return (
    <>
      <Router>
        <Navbar />
          <Routes>
            <Route exact path="/" element={<BloodTypeGrid />}/>
            <Route exact path="/bloodType/:type" element={<BloodTypePage />} />
            <Route path='*' element={<Navigate to={'/'} />}/>
            <Route exact path='/donorSignup' element={<DonorSignUp />} />
            <Route exact path='/donorLogin' element={<DonorLogin />} />
            <Route exact path='/staffLogin' element={<StaffLogin />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;

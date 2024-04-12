import "./App.css";
import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import BloodTypeGrid from "./features/bloddUnits/BloodTypeGrid";
import BloodTypePage from "./features/bloddUnits/BloodTypePage";
import DonorSignUp from "./features/user/donor/DonorSignup";
import DonorLogin from "./features/user/donor/DonorLogin";
import StaffLogin from "./features/user/staff/StaffLogin";
import ProfilePage from "./features/user/donor/ProfilePage";
import StaffProfilePage from "./features/user/staff/StaffProfilePage";
import AppointmentForm from "./features/appointments/AppointmentForm";


function App() { 
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.removeItem('role');  
      localStorage.removeItem('userData');     
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); 
  

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
            <Route exact path="/donor/profile/" element={<ProfilePage />}/>
            <Route exact path="/staff/profile/" element={<StaffProfilePage />}/>
            <Route exact path="/donor/:donor_id/bookAppointment" element={<AppointmentForm />}/>
          </Routes>
      </Router>
    </>
  );
}

export default App;

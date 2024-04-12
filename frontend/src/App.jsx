import "./App.css";
import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import BloodTypeGrid from "./features/bloddUnits/BloodTypeGrid";
import BloodTypePage from "./features/bloddUnits/BloodTypePage";
import DonorSignUp from "./features/donor/DonorSignup";
import DonorLogin from "./features/donor/DonorLogin";
import StaffLogin from "./features/staff/StaffLogin";
import ProfilePage from "./features/donor/ProfilePage";
import StaffProfilePage from "./features/staff/StaffProfilePage";


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
          </Routes>
      </Router>
    </>
  );
}

export default App;

import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sildbar from "./components/Sildbar";
import { Route, Routes } from "react-router-dom";
import AllAppoinments from "./pages/Admin/AllAppoinments";
import Dashboard from "./pages/Admin/Dashboard";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";
import Navigate from "./pages/Admin/Navigate";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Admin/Doctor/DoctorDashboard";
import DoctorAppoinment from "./pages/Admin/Doctor/DoctorAppoinment";
import DoctorProfile from "./pages/Admin/Doctor/DoctorProfile";


function App() {
  const { atoken,setAtoken } = useContext(AdminContext)
  const {dtoken,setDtoken} = useContext(DoctorContext)


  return atoken || dtoken ?(
  <div>
    <ToastContainer/>
    <Navbar/>
    <div className="flex items-center">
      <Sildbar/>
      <Routes>
      {/* Admin Routes */}
        <Route path="/" element={<Navigate/>}/>
        <Route path="/admin-dashboard" element={<Dashboard/>}/>
        <Route path="/all-appoinments" element={<AllAppoinments/>}/>
        <Route path="/add-doctor" element={<AddDoctor/>}/>
        <Route path="/doctor-list" element={<DoctorList/>}/>

{/* Doctor Routes */}
  <Route path="/doctor-dashboard" element={<DoctorDashboard/>}/>
  <Route path="/doctor-appoinments" element={<DoctorAppoinment/>}/>
   <Route path="/doctor-profile" element={<DoctorProfile/>}/>
      </Routes>
    </div>
  </div>
  ) : (
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App;

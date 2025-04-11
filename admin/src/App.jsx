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

function App() {
  const { atoken,setAtoken } = useContext(AdminContext)



  return atoken ?(
  <div>
    <ToastContainer/>
    <Navbar/>
    <div className="flex items-center">
      <Sildbar/>
      <Routes>
        <Route path="/" element={<></>}/>
        <Route path="/admin-dashboard" element={<Dashboard/>}/>
        <Route path="/all-appoinments" element={<AllAppoinments/>}/>
        <Route path="/add-doctor" element={<AddDoctor/>}/>
        <Route path="/doctor-list" element={<DoctorList/>}/>


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

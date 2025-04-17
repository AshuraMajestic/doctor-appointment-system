import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  // State management
  const [atoken, setAtoken] = useState(localStorage.getItem("atoken") || "");
  const [doctors, setDoctors] = useState([]);
  const [appoinment , setAppoinment] = useState([])
  const [dashdata,setDashdata] = useState(false)

  const backendurl = import.meta.env.VITE_BACKEND_URL;

  // Function to fetch all doctors
  const getAlldoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/all-doctors`, 
        {}, 
        { headers: { atoken } }
      );
      if (data.sucess) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Function to change doctor availability
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/change-availability`,
        { docId },
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAlldoctors(); // Refresh doctors list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getAllappoinment = async() =>{
    try {
      const {data} =await axios.get(backendurl + 'api/admin/appoinments',{headers : {atoken}})
      if (data.success) {
        setAppoinment(data.appoinment)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
 
  // Fetch doctors list on component mount if token exists
  useEffect(() => {
    if (atoken) {
      getAlldoctors();
    }
  }, [atoken]);

  const cancelappoinments = async(appoinmentId) =>{
    try {
      const {data} = await axios.post(backendurl + 'api/admin/cancel-appoinment',{appoinmentId},{headers :{atoken}} )
      if (data.success) {
        toast.success(data.message)
        getAllappoinment()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getDashData = async() =>{
    try {
      const {data} = await axios.get(backendurl + '/api/admin/admin-dashboard',{headers : {atoken}})
      if (data.sucess) {
        setDashdata(data.dashboard)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }
  }
  // Context value
  const value = { atoken, setAtoken, backendurl, doctors, getAlldoctors,appoinment, changeAvailability,getAllappoinment ,cancelappoinments ,getDashData,dashdata };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
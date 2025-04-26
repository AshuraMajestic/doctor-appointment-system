import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast  } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [dtoken, setDtoken] =  useState(localStorage.getItem("dtoken") || false);
  const [appoinments , setAppoinments] = useState([])
  const [dashData,setDashData] = useState(false)
  const [profileData,setProfileData] = useState(false)
  useEffect(() => {
      const storedToken = localStorage.getItem("dtoken");
      setDtoken(storedToken)
    }, []);
  const getAppoinments = async() =>{
    try {
      
      const {data} = await axios.get(`${backendUrl}/api/doctor/appoinments`, {headers:{dtoken}})
      if (data.sucess) {
        setAppoinments(data.appoinments)
        console.log(data.appoinments);
        
      }else{
  toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  const cancelAppoinment = async (appoinmentId) =>{
    try {
      const {data} = await axios.post(`${backendUrl}/api/doctor/cancel-appoinment`,{appoinmentId},{headers : {dtoken}})

      if (data.sucess) {
  toast.success(data.message)
  getAppoinments()        
      }else{
        toast.error(data.message)
      }
    } catch (error) {
        console.log(error);
      toast.error(error.message)
    }
  }

  const completeAppoinment = async (appoinmentId) =>{
    try {
      const {data} = await axios.post(`${backendUrl}/api/doctor/complete-appoinment`,{appoinmentId},{headers : {dtoken}})

      if (data.sucess) {
  toast.success(data.message)
  getAppoinments()        
      }else{
        toast.error(data.message)
      }
    } catch (error) {
        console.log(error);
      toast.error(error.message)
    }
  }

 const getDashData = async () =>{
  try {
    const {data} = await axios.get(`${backendUrl}/api/doctor/dashboard`,{headers: {dtoken}})
    if (data.success) {
      setDashData(data.dashData)
      console.log(data.dashData);
      
    }else{
      toast.error(data.message)
    }

  } catch (error) {
    console.log(error);
    toast.error(error.message)
  }
 }

 const getProfileData = async () =>{
  try {

    const {data} = await axios.get(`${backendUrl}/api/doctor/profile`,{headers : {dtoken}})

    if(data.success){
      setProfileData(data.profileData)
      console.log(data.profileData)
      
    }
    
  } catch (error) {
    console.log(error);
    toast.error(error.message)
  }
 }

  
  const value = {dtoken,setDtoken,backendUrl,setAppoinments,getAppoinments,cancelAppoinment,completeAppoinment,
    dashData,setDashData,getDashData , profileData , setProfileData, getProfileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;

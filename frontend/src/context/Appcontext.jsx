import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = `$`;
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [userData, setUserData] = useState(null); // ✅ Changed `false` to `null`

  // Fetch doctors' data
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Load user profile
  const loadUserProfiledata = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/user/get-profile`, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Fixed header format
      });

      if (data.success && data.userData) {
        setUserData(data.userData);
      } else {
        setUserData(null);
        toast.error(data.message || "Failed to load user profile");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfiledata();
    } else {
      setUserData(null);
    }
  }, [token]);

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendurl,
    userData,
    setUserData,
    loadUserProfiledata,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;

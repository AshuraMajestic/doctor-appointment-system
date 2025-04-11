import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {  // State management
  const [atoken, setAtoken] = useState(localStorage.getItem("atoken") || "");
  const [doctors, setDoctors] = useState([]);
  const backendurl = import.meta.env.VITE_BACKEND_URL;

// Function to fetch all doctors
  const getAlldoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/all-doctors`, 
        {}, 
        { headers: { atoken } }
      );

      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
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

  // Fetch doctors list on component mount if token exists
  useEffect(() => {
    if (atoken) {
      getAlldoctors();
    }
  }, [atoken]);

  // Context value
  const value = { atoken, setAtoken, backendurl, doctors, getAlldoctors, changeAvailability };


  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

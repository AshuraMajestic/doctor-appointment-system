import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';

function Sidebar() {
  const { atoken } = useContext(AdminContext);

  const {dtoken} = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-white border-r'>
      {
        atoken && (
          <ul className='text-[#515151] mt-5'>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''
                }`
              }
              to="/admin-dashboard"
            >
              <img src={assets.home_icon} />
              <p>Dashboard</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''
                }`
              }
              to="/all-appoinments"
            >
              <img src={assets.appointment_icon} />
              <p>Appointments</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''
                }`
              }
              to="/add-doctor"
            >
              <img src={assets.add_icon} />
              <p>Add Doctors</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''
                }`
              }
              to="/doctor-list"
            >
              <img src={assets.people_icon} />
              <p>Doctor List</p>
            </NavLink>

          </ul>
        )
      }

{/* Doctor Slidebar */}
{
        dtoken && (
          <ul className='text-[#515151] mt-5'>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''
                }`
              }
              to="/doctor-dashboard"
            >
              <img src={assets.home_icon} />
              <p className='hidden md:block'>Dashboard</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''
                }`
              }
              to="/doctor-appoinments"
            >
              <img src={assets.appointment_icon} />
              <p className='hidden md:block'>Appointments</p>
            </NavLink>

      

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''
                }`
              }
              to="/doctor-profile"
            >
              <img src={assets.people_icon} />
              <p className='hidden md:block'>Profile</p>
            </NavLink>

          </ul>
        )
      }

    </div>
  );
}

export default Sidebar;

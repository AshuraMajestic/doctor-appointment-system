import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext';

function Navbar() {

  const { atoken, setAtoken } = useContext(AdminContext);
  const { dtoken, setDtoken } = useContext(DoctorContext);

   const navigate = useNavigate()
   
   const Logout = () =>{
     atoken && setAtoken('');
     dtoken && setDtoken('');
     atoken && localStorage.removeItem('atoken')
     dtoken && localStorage.removeItem('dtoken')
      navigate('/')
      }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo}/>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{atoken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={Logout} className='bg-blue-500 text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar

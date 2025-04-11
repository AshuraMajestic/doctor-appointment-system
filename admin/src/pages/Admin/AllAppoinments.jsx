import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { isAxiosError } from 'axios'
import {assets} from '../../assets/assets'
function AllAppoinments() {
   const [aToken, appoinment, getAllappoinment] = useContext(AdminContext)

    const {calculateAge,sloteDate, currency , cancelappoinment} = useContext(AppContext)

   useEffect(()=>{
    if (aToken) {
      getAllappoinment()
    }
   },[aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium '>All Appoinment</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1dr] grid-flow-col py-3 px-6 border-bottom'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>fees</p>
          <p>Actions</p>

        </div>
        {appoinment.map((item,index) =>(
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 border-b hover:bg-gray-50' key={index}>
<p>{index+1}</p>
<div className='flex iems-center gap-2'>
<img className='w-8 rounded-full' src={item.userData.image} alt=''/>
<p>{item.userData.name}</p>
</div>
<p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
<p>{item.sloteDate}, {item.sloteTime}</p>
<div className='flex items-center gap-2'>
<img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt=''/>
<p>{item.userData.name}</p>
</div>
<p>{currency}{item.amount}</p>
{item.cancelled 
?     <p className='text-red-400 text-sm font-medium'>cancelled</p> 
: <img onClick={()=>cancelappoinment(item._id)} src={assets.cancel_icon} className='w-10 cursor-pointer' alt=''/> }
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppoinments

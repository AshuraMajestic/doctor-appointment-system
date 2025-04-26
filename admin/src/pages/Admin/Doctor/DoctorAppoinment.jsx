import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../../context/DoctorContext'
import { AppContext } from '../../../context/AppContext'
import { assets } from '../../../assets/assets'

function DoctorAppoinment() {

  const {dtoken,appoinments , getAppoinments , completeAppoinment , cancelAppoinment}  = useContext(DoctorContext)
  const {calculateAge , slotDateFormat} = useContext(AppContext)

  useEffect(() =>{
     if (dtoken) {
      getAppoinments()
     }
  },[dtoken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appoinment</p>
      
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payments</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {
     appoinments.reverse().map((item,index)=>{
      <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid 
      grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
      <p className='max-sm:hidden'>{index+1}</p>
      <div className='flex items-center gap-2'>
      <img className='w-8 rounded-full' src={item.userData.image} alt=''/>
      <p>{item.userData.name}</p>
      </div>
      <div>
      <p className='text-xs inline border border-blue-500 px-2 rounded-full'>{item.payment ? 'Online' : 'Cash'}</p>
      </div>
      <p>{calculateAge(item.userData.dob)}</p>
      <p>{slotDateFormat(item.slotData)},{item.slotTime}</p>
      <p>{currency} {item.amount}</p>
{
  item.cancelled
  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
  : item.isComplted
  ? <p className='text-green-500 text-sm font-medium'>Completed</p>
  :  <div className='flex'>
      <img onClick={()=> cancelAppoinment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt=''/>
      <img className='w-10 cursor-pointer' onClick={completeAppoinment(item._id)} src={assets.tick_icon} alt=''/>
      </div>
}
      
      </div>
      
     })
        }
      </div>
    </div>
  )
}

export default DoctorAppoinment

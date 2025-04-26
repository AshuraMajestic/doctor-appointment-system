import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../../context/DoctorContext'
import {assets} from '../../../assets/assets'
import { AppContext } from '../../../context/AppContext'



function DoctorDashboard() {
  const {dtoken,dashData,setDashData,getDashData , completeAppoinment, cancelAppoinment} = useContext(DoctorContext)
  const {currency , slotDateFormat} = useContext(AppContext)
  
  useEffect(()=>{
    if (dtoken) {
      getDashData()
    }
  },[dtoken])

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
              <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img className='w-14' src={assets.earning_icon} alt='' />
                <div>
                  <p className='text-xl font-semibold text-gray-600'>{currency} {dashData.earnings}</p>
                  <p className='text-gray-400'>Earnings</p>
                </div>
              </div>
      
              <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img className='w-14' src={assets.appointments_icon} alt='' />
                <div>
                  <p className='text-xl font-semibold text-gray-600'>{dashData.appoinments}</p>
                  <p className='text-gray-400'>Appointments</p>
                </div>
              </div>
      
              <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img className='w-14' src={assets.patients_icon} alt='' />
                <div>
                  <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
                  <p className='text-gray-400'>Patients</p>
                </div>
              </div>
            </div>
      
       {/* Latest Bookings */}
            <div className='bg-white'>
              <div className='flex items-center gap-2.5 px-4 mt-10 rounded-t border'>
                <img src={assets.list_icon} alt='' />
                <p className='font-semibold'>Latest Bookings</p>
              </div>
      
              <div className='mt-4 border border-t-0'>
                {dashData.latestAppoinments?.length > 0 ? (
                  dashData.latestAppoinments.map((item, index) =>
                    item ? (
                      <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                        <img className='rounded-full w-10' src={item?.userData?.image} alt='Doctor' />
                        <div className='flex-1 text-sm'>
                          <p className='text-gray-800 font-medium'>{item?.userData?.name}</p>
                          <p className='text-gray-800 font-medium'>{item?.slotDate}</p>
                          {
                            item.cancelled
                            ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                            : item.isComplted
                            ? <p className='text-green-500 text-sm font-medium'>Completed</p>
                            :  <div className='flex'>
                            <img
  className='w-10 cursor-pointer'
  onClick={() => cancelAppoinment(item._id)}
  src={assets.cancel_icon}
  alt=''
/>

<img
  className='w-10 cursor-pointer'
  onClick={() => completeAppoinment(item._id)}
  src={assets.tick_icon}
  alt=''
/>

                                </div>
                          }
                        </div>
                      </div>
                    ) : null
                  )
                ) : (
                  <p className='p-4 text-gray-400'>No recent appointments</p>
                )}
              </div>
            </div>
            
    </div>
  )
}

export default DoctorDashboard

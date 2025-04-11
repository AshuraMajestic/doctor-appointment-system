import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

function Dashboard() {

  const {aToken,getdashdata,cancelappoinment,dashdata} = useContext(AdminContext)

  const {slotedate} = useContext(AppContext)

  useEffect(()=>{
    if (aToken) {
      getdashdata
    }
  },[aToken])


  return dashdata && (
    <div className='m-5'>
    <div className='flex flex-wrap gap-3'>
      <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
        <img className='w-14' src={assets.doctor_icon} alt=''/>
        <div>
          <p className='text-xl font-semibold text-gray-600'>{dashdata.doctors}</p>
          <p className='text-gray-400'>doctors</p>
        </div>
      </div>

      <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
        <img className='w-14' src={assets.appointment_icon} alt=''/>
        <div>
          <p className='text-xl font-semibold text-gray-600'>{dashdata.appoiments}</p>
          <p className='text-gray-400'> Appoinment</p>
        </div>
      </div>

      <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
        <img cla
        w-14 src={assets.patients_icon} alt=''/>
        <div>
          <p className='text-xl font-semibold text-gray-600'>{dashdata.patients}</p>
          <p className='text-gray-400'>patients</p>
        </div>
      </div>
    </div>

    <div className='bg-white'>
      <div className='flex items-center gap-2.5 px-4 mt-10 rounded-t border'>
        <img src={assets.list_icon} alt=''/>
        <p className='font-semibold'>Latest Bookings</p>
      </div>

      <div className='mt-4 border border-t-0'>
{dashdata.latestAppoinment.map((item,index)=>(
  <div className='flex items-center px-6 py-3 gap-3 hover-bg-gray-100' key={index}>
  <img className='rounded-full w-10' src={item.docdata.image} alt=''/>
<div className='flex-1 text-sm '>
<p className='text-gray-800 font-medium'>{item.docdata.name}</p>
<p className='text-gray-800 font-medium'>{item.slotedate}</p>
{item.cancelled 
?     <p className='text-red-400 text-sm font-medium'>cancelled</p> 
: <img onClick={()=>cancelappoinment(item._id)} src={assets.cancel_icon} className='w-10 cursor-pointer' alt=''/> }
</div>
  </div>
))}
      </div>
    </div>
      
    </div>
  )
}

export default Dashboard

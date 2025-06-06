import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { isAxiosError } from 'axios'
import { assets } from '../../assets/assets'
function AllAppoinments() {
  const { atoken, appoinment, getAllappoinment, cancelappoinments } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)
  useEffect(() => {
    if (atoken) {
      getAllappoinment()

    }
  }, [atoken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium '>All Appoinment</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1dr] grid-flow-col py-3 px-6 border-bottom'>

          <p>Patient</p>
          <p>Date & Time</p>
          <p>fees</p>
          <p>Actions</p>

        </div>
        {appoinment.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 border-b hover:bg-gray-50' key={index}>
            <p className='pl-4'>{index + 1}</p>
            <div className='flex iems-center gap-2'>
              <p>{item.userData.name}</p>
            </div>
            <p>{item.slotDate}, {item.slotTime}</p>

            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt='' />
              <p>{item.userData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {item.cancelled
              ? <p className='text-red-400 text-sm font-medium'>cancelled</p>
              : <img onClick={() => cancelappoinments(item._id)} src={assets.cancel_icon} className='w-10 cursor-pointer' alt='' />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppoinments

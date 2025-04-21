import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/Appcontext'
import axios from 'axios'
import { toast } from 'react-toastify'
function Myappoinment() {

  const {backendurl, token,getDoctorsData,doctors} = useContext(AppContext)
  const [appoinment,setAppoinment] = useState([])
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const slotDateFormat =  (slotDate) =>{
  const dateArray = slotDate.split('_')
  return dateArray[0] + "" + months[Number(dateArray[1])] + "" + dateArray[2]
}

  const getUserAppoinments = async () =>{
    try {
      const { data } = await axios.get(
        `${backendurl}/api/user/appoinments`, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (data.sucess) {
        setAppoinment(data.appoinments.reverse())
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  const cancelappoinments = async (appoinmentId) =>{
    try {
      const { data } = await axios.patch(
        `${backendurl}/api/user/cancel-appoinment`,
        { appoinmentId },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
        if (data.success) {
          toast.success(data.message)
          getUserAppoinments()
        }else{
          toast.error(data.message)
        }
      
    } catch (error) {
      toast.error(error.message)
    }
  }
  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return `${day} ${months[Number(month) - 1]}, ${year}`;
  };
  
const initPay = (order) =>{
   const options = {
    key : import.meta.env.RAZORPAY_KEY_ID,
    amount : order.amount,
    currency : order.currency,
    name : 'Appoinment Payment',
    description : 'Appoinment Payment',
    order_id : order.id,
    reciept : order.reciept,
    handler : async (response) =>{ 
      console.log(response);
      
    }
   }
   const rzp = new window.RAZORPAY(options)
   rzp.open()
}

  const appointmentRazorpay = async (appoinmentId) =>{
  try {
    
    const { data } = await axios.post(
      backendurl + '/api/user/payment-razorpay',
      { appoinmentId },
      { headers: {'Authorization': `Bearer ${token}` }}
    );

    if (data.sucess) {
    initPay(data.order)      
    }

  } catch (error) {
    
  }
  }


  useEffect(()=>{
    if (token) {
      getUserAppoinments()
    }
  },[token])
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appoinment</p>
      <div>
        {appoinment.slice(0,3).map((item,index)=>(
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
          <div> 
          <img className='w-32 bg-indigo-50' src={item.docData.image} alt=''/>
          </div>
          <div className='flex-1 text-sm text-zinc-600'>
          <p className='text-netural-800 font-semibold'>{item.docData.name}</p>
          <p>{item.docData.speciality}</p>
          <p className='text-zinc-700 font-medium mt-1'>Address</p>
          <p className='text-xs'>{item.docData.address.line1}</p>
          <p className='text-xs'>{item.docData.address.line2}</p>
          <p className='text-xs mt-1'><span className='text-sm text-netural-700 font-medium'>Date & Time : </span>{formatDate(item.slotDate)} | {item.slotTime}</p>
          </div>

          <div className='flex flex-col gap-2 justify-end'>
         {!item.cancelled && <button onClick={()=> appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-500 hover:text-white transition-all duration-all duration-300'>Pay Online</button>} 
          {!item.cancelled && <button  onClick={()=> cancelappoinments(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-all duration-300'>Cancel Appoinment</button>}
    
          {item.cancelled && (
                <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                  Appointment cancelled
                </button>
              )}

           </div>
           </div>
        ))}
      </div>
    </div>
  )
}

export default Myappoinment

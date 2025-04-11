import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/Appcontext'
import axios from 'axios'
import { toast } from 'react-toastify'
function Myappoinment() {

  const {backendUrl, token,getDoctorsData} = useContext(AppContext)
  const [appoinment,setAppoinment] = useState([])
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const slotDateFormat =  (slotDate) =>{
  const dateArray = slotDate.split('_')
  return dateArray[0] + "" + months[Number(dateArray[1])] + "" + dateArray[2]
}

  const getUserAppoinments = async () =>{
    try {
      const {data} = await axios.get(backendUrl + '/api/uer/appoinments',{headers : {token}})

      if (data.sucess) {
        setAppoinment(data.appoinment.reverse())
        console.log(data.appoinment);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  const cancelappoinments = async (appoinmentId) =>{
    try {
const {data} = await axios.post(backendUrl + '/api/user/cancel-appoinment',{appoinment},{headers : {token}})
if (data.sucess) {
  toast.sucess(data.message)
 getUserAppoinments()
}else{
  toast.error(data.message)
}
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

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
    
    const {data} = await axios.post(backendUrl + '/api/user/payment-razorpay',{appoinmentId},{headers : {token}})

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
  })
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appoinment</p>
      <div>
        {doctors.slice(0,3).map((item,index)=>(
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
          <p className='text-xs mt-1'><span className='text-sm text-netural-700 font-medium'>Date & Time : </span> 25,july,2024 | 8:30 Pm</p>
          </div>

          <div className='flex flex-col gap-2 justify-end'>
         {!item.cancelled && <button onClick={()=> appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-500 hover:text-white transition-all duration-all duration-300'>Pay Online</button>} 
          {!item.cancelled && <button  onClick={()=> cancelappoinments(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-all duration-300'>Cancel Appoinment</button>}
    
    {!item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appoinment cancelled</button>}
           </div>
           </div>
        ))}
      </div>
    </div>
  )
}

export default Myappoinment

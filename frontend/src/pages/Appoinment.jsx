import React, { useContext, useEffect, useState } from 'react';
import { data, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';
import { assets } from '../assets/assets';
import RelatedDoctor from '../components/RelatedDoctor';
import { toast } from 'react-toastify';
import axios from 'axios';

function Appoinment() {
  const { docId } = useParams();
  console.log(docId)
  const { doctors,currencySymbol,backendUrl , token, getDoctorsData } = useContext(AppContext);
  const dayofWeek = ['SUN', 'MON', 'TUE', 'WED', "THU", "FRI", "SAT"];

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots,setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(1);
  const [slotTime, setSlotTime] = useState('');

  useEffect(() => {
    if (doctors.length > 0) {
      const docInfo = doctors.find(doc => doc._id === docId);
      setDocInfo(docInfo);
    }
  }, [doctors, docId]);

  useEffect(() => {
    const getAvailableSlots = async () => {
      setDocSlots([]);

      // Getting current date
      let today = new Date();
      let slotsArray = [];

      for (let i = 0; i < 7; i++) {
          //  Getting date with index
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        // setting end time of the data with index
        let endTime = new Date(currentDate);
        endTime.setHours(21, 0, 0, 0);

        // setting hours
        if (today.getDate() === currentDate.getDate()) {
          currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }

        let timeSlots = [];

        while (currentDate < endTime) {
          let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          // add slots to array
          let day = currentDate.getDate()
          let month = currentDate.getMonth()+1
          let year = currentDate.getFullYear()

          const slotDate = day + '-' + month + '-' + year
          const slotTime = formattedTime

          const isSlotAvailble = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

 if (isSlotAvailble) {
  // add slots to array
  timeSlots.push({
    datetime: new Date(currentDate),
    time: formattedTime
  });
 }

//  Increment current time by 30 mintues
   currentDate.setMinutes(currentDate.getMinutes() + 30);
        }

        slotsArray.push(timeSlots);
      }

      setDocSlots(slotsArray);
    };

    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  const bookAppoinment = async()=>{
    if (!token) {
      toast.warn('Login to Book Appoinment')
      return navigate('/login')
    }
    try {
       const date = docSlots[slotIndex][0].datatime

       let day = date.getDate()
       let month = date.getMonth()+1
       let year = date.getFullYear()
       
const slotDate = day + '-' + month + '-' + year
 
const { data} = await axios.post(backendUrl,+ '/api/user/book-appoinment',{docId,slotDate,slotTime},{headers : {token}})

if (data.sucess) {
  toast.sucess(data.message)
  getDoctorsData()
  navigate('/my-appoinments')
}  else {
  toast.error(data.message)
}

} catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  useEffect(()=>{

  },[])
  return docInfo && (
    <div>
      {/* Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          {docInfo ? (
            <img className='bg-blue-500 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt={docInfo.name} />
          ) : (
            <p>Loading doctor details...</p>
          )}
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0mt-[-80px]'>
          {/********************* Doc Info : name , degree, experience*************/}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img src={assets.verified_icon}/>
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          {/* Doctor About */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon}/></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
          Appoinment fee : <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></p>
        </div>
      </div>
      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
      <p>Booking slots</p>
      <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
        {
          docSlots.length && docSlots.map((item,index)=>(
            <div onClick={()=>setSlotIndex(index)}
  key={index}
  className={`text-center py-6 min-w-[64px] rounded-full cursor-pointer 
    ${slotIndex === index ? 'bg-blue-500 text-white' : 'border border-gray-200 text-gray-700'}`}
>
  <p>{item[0] && dayofWeek[item[0].datetime.getDay()]}</p>
  <p>{item[0] && item[0].datetime.getDate()}</p>
</div>
          )) 
        }
      </div>

      <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
{docSlots.length && docSlots[slotIndex].map((item,index)=>(
  <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-500 text-white' :'text-gray-400 border border-gray-300'}`} key={index}>{item.time.toLowerCase()}</p>
))}
      </div>
      <button onClick={bookAppoinment} className='bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appoinment</button>
      </div>

      {/* Listing Related Doctor Components */}
      <RelatedDoctor docId = {docId} speciality= {docInfo.speciality}/>
    </div>
  );
}

export default Appoinment;


import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import AdminContextProvider, {AdminContext} from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'

function AddDoctor() {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')
 const [experience,setExperience] = useState('1 Year')
 const [fees,setFess] = useState('')
 const [about,setAbout] = useState('')
 const [specialist,setSpecialist] = useState('General Physician')
 const [degree,setDegree] = useState('')
 const [address1, setAddress1] = useState('')
 const [address2,setAddress2] = useState('')
 const { backendurl, atoken } = useContext(AdminContext)


 const onSumbitHandler = async(event) =>{
  event.preventDefault()


  try {
    if(!docImg){
      return toast.error('Image not Selected')
    }

    const formdata = new FormData()
    formdata.append('image',docImg)
    formdata.append('name',name)
    formdata.append('email',email)
    formdata.append('password',password)
    formdata.append('experience',experience)
    formdata.append('fees',Number(fees))
    formdata.append('about',about)
    formdata.append('speciality', specialist)

    formdata.append('degree',degree)
  formdata.append('address',JSON.stringify({line1: address1,line2 : address2}))

  // console.log formdata
  formdata.forEach((value,key)=>{
    console.log(`$(key) : ${value}`)
  })

  const {data} = await axios.post(backendurl + '/api/admin/add-doctor',formdata,{headers : {atoken}})

  if(data.sucess){
    if (data.success){
      toast.success(data.message)
    }
    
    setDocImg(false)
    setName('')
    setPassword('')
    setEmail('')
    setAddress1('')
    setAddress2('')
    setDegree('')
    setAbout('')
    setFess('')
  }else{
    toast.error(data.message)
  }
  } catch (error) {
    toast.error(error.message)
    console.log(error)
  }
 }



  return (
    <div>
<form onSubmit={onSumbitHandler}>
<p>Add Doctor</p>
<div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

<div className='flex items-center gap-4 mb-8 text-gray-500'>
  <label htmlFor='doc-img'>
    <img className='w-16 bg-gray-100 rounded-full cursor-pointer ' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt=''/>
  </label>
<input onChange={(e)=> setDocImg(e.target.files[0])} type='file' id='doc-img' hidden/>
<p>Upload doctor <br/> Picture</p>
</div>

<div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
  <div className='w-full lg:flex-1 flex flex-col gap-4'>


  <div className='flex-1 flex flex-col gap-1'>
    <p>Doctor Name</p>
  <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type='text' placeholder='Enter Your Name' required/>
  </div>

  <div className='flex-1 flex flex-col gap-1'>
    <p>Doctor Email</p>
  <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type='email' placeholder='Enter Email' required/>
  </div>

  <div className='flex-1 flex flex-col gap-1'>
    <p>Doctor Password</p>
  <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type='password' placeholder='Enter Passwoord' required/>
  </div>

  <div className='flex-1 flex flex-col gap-1'>
    <p>Experience</p>
   <select onChange={(e) => setExperience(e.target.value)} value={experience} name='' id=''>
    <option value='1 Year'>1 Year</option>
    <option value='2 Year'>2 Year</option>
    <option value='3 Year'>3 Year</option>
    <option value='4 Year'>4 Year</option>
    <option value='5 Year'>5 Year</option>
    <option value='6 Year'>6 Year</option>
    <option value='7 Year'>7 Year</option>
    <option value='8 Year'>8 Year</option>
    <option value='9 Year'>9 Year</option>
    <option value='10 Year'>10 Year</option>
  

   </select>
  </div>

  <div className='flex-1 flex flex-col gap-1'>
    <p>Doctor fee</p>
  <input onChange={(e) => setFess(e.target.value)} value={fees} className='border rounded px-3 py-2' type='number' placeholder='Enter fee' required/>
  </div>
  </div>


<div className='w-full lg:flex-1 flex flex-col gap-4'>  
  <div className='flex-1 flex flex-col gap-1'>
    <p>Specialist</p>
     <select onChange={(e) => setSpecialist(e.target.value)} value={specialist} className='border rounded px-3 py-2' name='' id=''>
  <option value='General physician' > General physician</option>
  <option value='Gynecologist' > Gynecologist</option>
  <option value='Dermatologist' > Dermatologist</option>
  <option value='Pediatricians' > Pediatricians</option>
  <option value='Neurologist' > Neurologist</option>
  <option value='Gastroenterologist' > Gastroenterologist</option>
     </select>
  </div>

  <div className='flex-1 flex flex-col gap-1'>
    <p>Education</p>
    <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type='text' placeholder='Education' required/>
  </div>

  <div className='flex-1 flex flex-col gap-1'>
    <p>Address</p>
    <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type='text' placeholder='address-1' required/>
    <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type='text' placeholder='address-2' required/>
  </div>
  </div>
  <div className='flex-1 flex flex-col gap-1'>
    <p className='mt-4 mb-2'>About Doctor</p>
    <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='border w-full rounded px-3 py-2' type = 'text' placeholder='Write about doctor' rows={5} required></textarea>
  </div>

  </div>

  <button type='submit' className='bg-blue-500 px-10 py-3 mt-4 text-white rounded-full'>Add Doctor</button>
  </div>


</form>
    </div>
  )
}

export default AddDoctor

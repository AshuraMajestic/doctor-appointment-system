
import doctorModel from '../models/doctorModel.js'
import appointmentModel1 from '../models/Appoinment.js';
import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as clodinary} from 'cloudinary'
import jwt from 'jsonwebtoken'


// Api for adding Doctor
const addDoctor = async(req , res)=>{
  try {
    const {email,name,password,speciality,degree,experience,about,fees,address} = req.body;
    const imageFile = req.file;

  // Checking for all data to add doctor
  if (!name  || !password || !speciality || !degree || !experience || !about || !fees || !address) {
    return res.json({sucess : false, message : "Missing Details"})
  }

  // vaildating email format
  if (!validator.isEmail(email)) {
    return res.json({sucess : false, message : "Please Enter Vaild Details"})

  }
  //  validating strog password
  if (password.length < 0) {
    return res.json({sucess : false, message : "Please Enter a Strong Password "})
  } 

  // Hashing Doctor Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password,salt)

  // upload image to cloudinary
  const imageupload = await clodinary.uploader.upload(imageFile.path,{resource_type :'image'})
  const imageUrl = imageupload.secure_url

  const doctorData = {
    name,
    email,
    image : imageUrl,
    password : hashedPassword,
    speciality,
    degree,
    experience,
    about,
    fee:fees,
    address : JSON.parse(address),
    date : Date.now()
  }
 
    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()

    res.json({sucess: true, message : "Doctor Added !"})
   
  } catch (error) {
    console.log(error);
    res.json({sucess : false , message : error.message})  
  }
}

// API for admin Login
const loginAdmin = async(req,res) =>{

  try {

    const {email,password} = req.body

    if (email === process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWOD )  {
      
      const token = jwt.sign(email +password,process.env.JWT_SECRET)
      res.json({sucess : true, token })
    }else {
      res.json({sucess : false, message : "Invaild credentials"})
    }
    
  } catch (error) {
    console.log(error);
    res.json({sucess : false, message : error.message})
    
  }
}


// API to get all doctors list for admin panel
const alldoctors = async(req ,res)=>{
  try {
    const doctors = await doctorModel.find({}).select('-password')
    res.json({sucess : true,doctors})
  } catch (error) {
    console.log(error)
     res.json({sucess : false,message : error.message})
  }
}

// Api to get all appoinment List

const appoinmentAdmin = async(req,res) =>{

  try {
    const appoinment = await appointmentModel1.find({})
  res.json({sucess: true, appoinment})
  } catch (error) {
    console.log(error);
    res.json({sucess : false, message : error.message})
    
    
  }
}

// api for appoinment canellation
const cancelappoinments = async(req,res)=>{
  try {
    const { appoinmentId} = req.body;
    const appoinmensData = await appointmentModel1.findById(appoinmentId);

 
    
    await appointmentModel1.findByIdAndUpdate(appoinmentId, {cancelled : true})

    // Releasing Doctor Slot
    const {docId, slotDate, slotTime }= appoinmensData

    const docData = await doctorModel.findById(docId)
    let  slots = docData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e!== slotTime)
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})

    res.json({sucess : true, message : error.message})

  }catch (error) {
    console.log(error);
    res.json({sucess : false, message : error.message})
    
  }
}

// Api to get the dashboard data for admin panel
const admindashboard  = async(req , res) =>{
  try {
    const doctors = await doctorModel.find({})
    const user = await userModel.find({})
    const appoinments = await appointmentModel1.find({})

    const dashboard = {
      doctors : doctors.length,
      appoinments : appoinments.length,
      patients : user.length,
      latestAppoinment : appoinments.reverse().slice(0,5)
    }
    res.json({sucess : true,dashboard})
  } catch (error) {
    console.log(error);
    res.json({sucess : false , message :error.message})
    
  }
}

export {addDoctor,loginAdmin,alldoctors,appoinmentAdmin, cancelappoinments , admindashboard }
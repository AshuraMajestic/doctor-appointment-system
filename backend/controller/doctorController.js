import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel1 from '../models/Appoinment.js'
import mongoose from "mongoose";

const changeAvailablity = async(req,res) =>{
  try {
    
  const {docId} = req.body;

  const  docData = await doctorModel.findById(docId)
  await doctorModel.findByIdAndUpdate(docId,{available : !docData.available})
  res.json({success : true, message : 'Availablity changed'})

  } catch (error) {
    console.log(error);
    res.json({success : false, error : error.message})

  }
}

const doctorList = async(req,res)=>{
  try {
    const doctors = await doctorModel.find({}).select(['-password','-email'])
    res.json({success : true,doctors})
  } catch (error) {
    console.log(error);
    res.json({success : false, error : error.message})
  }
}

// Api for Doctor Login
const logindoctor  = async(req,res) =>{
  try {
    const {email, password} = await req.body
    const doctor = await doctorModel.findOne({email})
    if (!doctor) {
      return res.json({success : false, message : 'Invalid credentials'})
    }
    
    const isMatch = await bcrypt.compare(password,doctor.password)

    if (isMatch) {
      const token = jwt.sign({id : doctor._id},process.env.JWT_SECRET)
      res.json({success: true,token:token})
    }else{
      res.json({success : false, message : 'Invaild Credentials' })
    }
  } catch (error) {
    console.log(error);
    res.json({success : false, message : error.message})
    
  }
}

// API to get doctor appoinments for doctor panel
const appoinmentsDoctor = async (req,res) =>{

  try {
    
    const {docId} = req.user
    const objectDocId = new mongoose.Types.ObjectId(docId);  // convert to ObjectId

    const appoinments = await appointmentModel1.find({ "docData._id": objectDocId });

    res.json({success : true, appoinments})

  } catch (error) {
    console.log(error);
    res.json({success : false, message : error.message})
    
  }

}

// API to mark appoinment completed for doctor panel
   const appoinmentComplete = async (req,res) =>{

    try {

      const { appoinmentId} = req.body
      const {docId}=req.user

      const appoinmentData = await appointmentModel1.findById(appoinmentId)
      if (appoinmentData && appoinmentData.docData._id.toString() == docId){
        await appointmentModel1.findByIdAndUpdate(appoinmentId,{isCompleted : true})
        return res.json({success:true, message : 'Appoinment Completed'})
      }
      else{
        return res.json({success : false,message : 'Mark Failed'})
      }
      
    } catch (error) {
      console.log(error);
      res.json({success : false, message : error.message})
    }
   }


// API to cancel appoinment completed for doctor panel
const appoinmentCancel = async (req,res) =>{

  try {
    const {docId}=req.user
    const { appoinmentId} = req.body

    const appoinmentData = await appointmentModel1.findById(appoinmentId)

    if (appoinmentData && appoinmentData.docData._id.toString() === docId){
      await appointmentModel1.findByIdAndUpdate(appoinmentId,{cancelled: true})
      return res.json({success:true, message : 'Appoinment Cancel'})
    }
    else{
      return res.json({success : false,message : 'Cancellation Failed'})
    }
    
  } catch (error) {
    console.log(error);
    res.json({success : false, message : error.message})
  }
 }


//  API to get dashboard data for doctor panel
const doctorDashboard = async(req,res) =>{

  try {
    const {docId} = req.user
    const objectDocId = new mongoose.Types.ObjectId(docId);  // convert to ObjectId

    const appointments = await appointmentModel1.find({ "docData._id": objectDocId });

    let earnings = 0

    appointments.forEach((item)=>{
      if (item.isCompleted || item.payment) {
        earnings += item.amount
      }
    })
    

    let patients = []

    appointments.map((item)=>{
      if (!patients.includes(item.userId)) {
        patients.push(item.userId)
      }
    })

    const dashData = {
      earnings,
      appoinments : appointments.length,
      patients : patients.length,
      latestAppoinments : appointments.reverse().slice(0,5)
    }
    res.json({success : true,dashData})
    
  } catch (error) {
    console.log(error);
    res.json({success : false, message : error.message})
  }
}

// API to get doctor profile for Doctor Panel
const doctorProfile = async (req,res) =>{

  try {
    
    const {docId} = req.user;
    const profileData = await doctorModel.findById(docId).select('-password')

    res.json({success : true, profileData})
  } catch (error) {
    console.log(error);
    res.json({success : false, message : error.message})
  }
}


// APi to update doctor profile data from Doctor Panel
const updateDoctorProfile = async (req,res) =>{

  try {
    
    const {fees,address,available} = req.body
    const {docId}=req.user
    await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
    
    res.json({success : true , message : 'Profile Updated'})

  } catch (error) {
    console.log(error);
    res.json({success : false, message : error.message})
  }
} 

export {changeAvailablity,doctorList,logindoctor,appoinmentsDoctor ,doctorProfile , appoinmentComplete , appoinmentCancel,updateDoctorProfile , doctorDashboard}
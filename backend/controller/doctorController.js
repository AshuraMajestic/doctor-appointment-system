import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

    if (!isMatch) {
      const token = jwt.sign({id : doctor._id},process.env.JWT_SECRET)
      res.json({success: false, message : error.message})
    }else{
      res.json({success : false, message : 'Invaild Credentials' })
    }
  } catch (error) {
    console.log(error);
    res.json({success : false, message : error.message})
    
  }
}
export {changeAvailablity,doctorList,logindoctor}
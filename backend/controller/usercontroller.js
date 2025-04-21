import vaildator from 'validator'
import  bcrypt from 'bcrypt'
import userModel from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'

import doctorModel from '../models/doctorModel.js'
import appointmentModel1 from '../models/Appoinment.js'
import Razorpay from "razorpay";

// API to register user
const registerUser = async(req,res)=>{
  try {
    const {name,email, password} = req.body

    if (!name || !email || !password) {
  return res.json({success : false, message : "Missing details"})      
    }
    
    // Vailding email format
    if (!vaildator.isEmail(email)) {
      return res.json({success : false, message : "Enter a vaild email"})      
    }

    // Vaildating strong password
    if (password.length <0) {
      return res.json({success : false, message : "Enter a strong password"})      
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const userData = {
      name, 
      email,
      password : hashedPassword
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()
   
     const token = jwt.sign({id: user._id},process.env.JWT_SECRET)

     res.json({success : true, token })
    
    
  }catch (error) {
    console.log(error);
    res.json({success : false, error : error.message})
  }
}

// API for user login
const loginUser = async(req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await userModel.findOne({email })
    if (!user) {

      res.json({sucess : false,message : 'User does not exist' })
    }
  const isMatch = await bcrypt.compare(password,user.password)

  if (isMatch) {
    const token = jwt.sign({id : user._id},process.env.JWT_SECRET)
    res.json({sucess : true, token })
  }else{
    res.json({sucess : false, message : 'Invaild credentails'})
  }
  } catch (error) {
    console.log(error);
    res.json({sucess : false,message : error.message })
  }
}

// API to get user profile data
const getprofile = async(req, res) => {
  try {
    const {userId} = req.user
    const userData = await userModel.findById(userId).select('-password')
    res.json({success: true, userData})
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
  }
}

// API to update user profile
const updateProfile = async(req,res)=>{
  try {
    const {userId,name,phone,address,dob,gender} = req.body
    const imageFile = req.file

    if (!name || !phone || !dob || !gender) {
      return res.json({sucess : false, message : "Data Missing"})
    }
    await userModel.findByIdAndUpdate(userId,{name,phone,address: JSON.parse(address),dob,gender})

    if (!imageFile) {
      // upload image to cloudinary
      const imageUplod = await cloudinary.uploader(imageFile.path,{resource_type : 'image'})
      const imageUrl = imageUplod.secure_url

     await userModel.findByIdAndUpdate(userId,{image : imageUrl})
    }

    res.json({sucess : true,  message : 'Profile Updated'})

  } catch (error) {
    console.log(error);
    res.json({sucess : false,message : error.message })
  }
}


// Api to Book appoinment
const bookAppoinment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const { userId } = req.user;

    const docData = await doctorModel.findById(docId).select('-password');

    if (!docData.availabe) {
      return res.json({ success: false, message: 'Doctor not available' });
    }

    // ✅ Deep copy to avoid side-effects
    const slotsBooked = { ...docData.slot_booked };

    if (slotsBooked[slotDate]) {
      if (slotsBooked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: 'Slot not available' });
      } else {
        slotsBooked[slotDate].push(slotTime);
      }
    } else {
      slotsBooked[slotDate] = [slotTime];
    }

    const userData = await userModel.findById(userId).select('-password');

    delete docData.slot_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel1(appointmentData);
    await newAppointment.save();

    // ✅ Update with full new object
    await doctorModel.findByIdAndUpdate(docId, {
      slot_booked: slotsBooked,
    });

    res.json({ success: true, message: 'Appointment Booked' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



// Api to get user appoinmentd for frontend my-appoinments page
const listAppoinments = async(req , res) =>{
  try {
    const {userId} = req.user
   const appoinments = await appointmentModel1.find({userId})
   res.json({sucess : true, appoinments})

  } catch (error) {
    console.log(error);
        res.json({sucess : false,message : error.message+"no" })

  }
}

// Api to cancell appoinment 
// API to cancel appointment
const cancelappoinments = async (req, res) => {
  try {
    const { appoinmentId } = req.body;
    const { userId } = req.user;

    const appoinmentData = await appointmentModel1.findById(appoinmentId);
    if (!appoinmentData) {
      return res.json({ success: false, message: 'Appointment not found' });
    }

    // Check if this appointment belongs to the logged-in user
    if (appoinmentData.userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: 'Unauthorized action' });
    }

    // Mark appointment as cancelled
    await appointmentModel1.findByIdAndUpdate(appoinmentId, { cancelled: true });

    // Free up the doctor's slot
    const { slotDate, slotTime } = appoinmentData;
    const docId = appoinmentData.docData._id;
    
    const docData = await doctorModel.findById(docId);

    const slots = { ...docData.slot_booked };

    if (slots[slotDate]) {
      slots[slotDate] = slots[slotDate].filter(time => time !== slotTime);

      // If all slots for that day are cleared, optionally delete the key
      if (slots[slotDate].length === 0) {
        delete slots[slotDate];
      }
    }

    await doctorModel.findByIdAndUpdate(docId, {
      slot_booked: slots,
    });

    res.json({ success: true, message: 'Appointment cancelled successfully' });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};




const razorpayInstance = new Razorpay({
  key_id : 'process.env.RAZORPAY_KEY_ID',
  key_secret : 'process.env.RAZORPAY_SECRET_ID'
})


const paymentRazorPay = async (req, res) => {
  try {
    const { appoinmentId } = req.body;

    const appoinmentData = await appointmentModel1.findById(appoinmentId);
    if (!appoinmentData || appoinmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment cancelled or not found",
      });
    }

    // Razorpay options
    const options = {
      amount: appoinmentData.amount * 100, // in paise
      currency: process.env.CURRENCY || "INR",
      receipt: `receipt_order_${appoinmentId}`,
    };

    // Create Razorpay order
    const order = await razorpayInstance.orders.create(options);

    return res.json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// Api to verfiy payment of razorpay
const verfiyRazorpay = async (req,res) =>{
  try {
    const {razorpay_order_id} = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

    console.log(orderInfo);
    
  } catch (error) {
    
  }
}
export {registerUser,loginUser,getprofile, updateProfile , bookAppoinment,listAppoinments, cancelappoinments , paymentRazorPay ,verfiyRazorpay }
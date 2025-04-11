import express from 'express'
import { registerUser,loginUser, getprofile, updateProfile,bookAppoinment,listAppoinments, cancelappoinments, paymentRazorPay, verfiyRazorpay } from '../controller/usercontroller.js'
import  authUser  from '../middleware/authUser.js'
import uplod from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',getprofile)
userRouter.post('/update-profile',uplod.single('image'),authUser,updateProfile)

userRouter.post('/book-appoinment',authUser,bookAppoinment)
userRouter.get('/appoinments',authUser,listAppoinments)
userRouter.patch('/cancel-appoinment', authUser,cancelappoinments)
userRouter.post('/payment-razorpay', authUser, paymentRazorPay)
userRouter.post('/verifyRazorpay' , authUser, verfiyRazorpay)
export default userRouter;
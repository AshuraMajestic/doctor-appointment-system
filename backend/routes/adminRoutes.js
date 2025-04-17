import express from 'express'
import { addDoctor,alldoctors,appoinmentAdmin,loginAdmin,cancelappoinments , admindashboard } from '../controller/admincontroller.js'
import upload from '../middleware/multer.js'
import { changeAvailablity } from '../controller/doctorController.js'
import adminAuth from '../middleware/authAdmin.js'
const adminRoutes = express.Router()

adminRoutes.post('/add-doctor',adminAuth,upload.single('image'),addDoctor)
adminRoutes.post('/login',loginAdmin)
adminRoutes.post('/all-doctors',adminAuth,alldoctors)
adminRoutes.post('/change-availablity',adminAuth,changeAvailablity)
adminRoutes.post('/appoinments',adminAuth,appoinmentAdmin)
adminRoutes.post('/cancel-appoinment', adminAuth, cancelappoinments )
adminRoutes.post('/admin-dashboard', adminAuth, admindashboard)


export default adminRoutes
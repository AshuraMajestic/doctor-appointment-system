import express from 'express'
import { doctorList , logindoctor ,appoinmentsDoctor,appoinmentCancel ,doctorProfile, updateDoctorProfile,appoinmentComplete, doctorDashboard } from '../controller/doctorController.js'
import authDoctor from '../middleware/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login', logindoctor)
doctorRouter.get('/appoinments', authDoctor,appoinmentsDoctor)
doctorRouter.post('/complete-appoinment',authDoctor,appoinmentComplete)
doctorRouter.post('/cancel-appoinment',authDoctor,appoinmentCancel)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)
export default doctorRouter
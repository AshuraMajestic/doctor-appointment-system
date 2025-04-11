import express from 'express'
import { doctorList , logindoctor } from '../controller/doctorController.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login', logindoctor)

export default doctorRouter
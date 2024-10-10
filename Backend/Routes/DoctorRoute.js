import express from 'express'
import { AllDoctors, LoginDoctor } from '../Controllers/DoctorControllers.js'

export const DoctorRouter = express.Router()

DoctorRouter.get('/list',AllDoctors);
DoctorRouter.post('/login',LoginDoctor);
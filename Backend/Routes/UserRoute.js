import express from 'express'
import { Appointment, CancleAppointment, GetProfile, ListAppointment, LoginUser, RegisterUser, UpdateProfile } from '../Controllers/UserControllers.js';
import AuthUser from '../Middelwares/AuthUser.js';
import upload from '../Middelwares/Multer.js';

export const UserRouter = express.Router();

UserRouter.post('/register',RegisterUser);
UserRouter.post('/login',LoginUser);
UserRouter.get('/get-profile',AuthUser,GetProfile);
UserRouter.post('/update-profile',upload.single('image'),AuthUser,UpdateProfile);
UserRouter.post('/book-appointment',AuthUser,Appointment);
UserRouter.get('/appointments',AuthUser,ListAppointment);
UserRouter.post('/cancel-appointment',AuthUser,CancleAppointment);
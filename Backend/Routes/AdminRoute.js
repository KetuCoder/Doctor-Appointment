import express from "express";
import { AddDoctor , AdminDashboard, AppointmentAdmin, AppointmentCancel, LoginAdmin } from "../Controllers/AdminControllers.js";
import upload from "../Middelwares/Multer.js";
import AuthAdmin from "../Middelwares/AuthAdmin.js";
import { ChangeAvailablity } from "../Controllers/DoctorControllers.js";

export const AdminRouter = express.Router();

AdminRouter.post('/add-doctor',AuthAdmin,upload.single('image'),AddDoctor);
AdminRouter.post('/login',LoginAdmin);
AdminRouter.post('/change-availability',AuthAdmin,ChangeAvailablity);
AdminRouter.get('/appointments',AuthAdmin,AppointmentAdmin);
AdminRouter.post('/cancel-appointment',AuthAdmin,AppointmentCancel);
AdminRouter.get('/dashboard',AuthAdmin,AdminDashboard);
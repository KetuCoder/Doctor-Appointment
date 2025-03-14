import bcryptjs from 'bcryptjs';
import validator from 'validator';
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken'
import DoctorModel from '../Models/DoctorModel.js';
import AppointmentModel from '../Models/Appointment.js';
import UserModel from '../Models/UserModel.js';

export const AddDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ message: "Image is required" });
    }

    // if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !experience || !address) {
    //   return res.json({ Success: false, Message: "All Fields Are Required !" });
    // }

    if (!validator.isEmail(email)) {
      return res.json({ Success: false, Message: "Email Is Incorrect!" });
    }

    const hash = await bcryptjs.hash(password, 10); // Await the hash to get the resolved value

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" }); // Await the upload to get the resolved value
    const imageUrl = imageUpload.secure_url; // Access the secure URL after the upload


    const doctorData = {name,email,image: imageUrl,password: hash,speciality,degree,experience,about,fees,address: JSON.parse(address),
      date: Date.now(),};

    const newDoctor = new DoctorModel(doctorData);
    await newDoctor.save();

    return res.json({ Success: true, Message: "New Doctor Added!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const LoginAdmin = async (req,res) => {
  try {
    const { email , password } = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const Token = jwt.sign(email+password,process.env.JWT_TOKEN);
        res.json({ Success : true , Token })
    }else{
      return res.json({ Success : false , Message : "Invalid Credentials !" })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const AppointmentAdmin = async (req,res) => {
  try {
    const appointments = await AppointmentModel.find({});
    res.json({ Success : true , appointments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const AppointmentCancel = async (req,res) => {
  try {
      const { appointmentId } = req.body;
      const appointmentData = await AppointmentModel.findById(appointmentId)
      
      await AppointmentModel.findByIdAndUpdate(appointmentId,{cancelled : true })

      const { docId , slotDate , slotTime } = appointmentData
      const doctorData = await DoctorModel.findById(docId)
      let slots_booked = doctorData.slots_booked

      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
      await DoctorModel.findByIdAndUpdate(docId,{slots_booked});
      res.json({ Success : true , Message : "Appointment Cancelled" });
  } catch (error) {
      console.log(error);
      return res.json({ Success: false, Message: "Internal Server Error!" });
  }
}

export const AdminDashboard = async (req,res) => {
  try {
    const doctors = await DoctorModel.find({})
    const users = await UserModel.find({})
    const appointments = await AppointmentModel.find({})

    const dashData = { 
      doctors : doctors.length,
      patients : users.length,
      appointments : appointments.length,
      latestAppointments : appointments.reverse().slice(0,5)
    }
    res.json({ Success : true , dashData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

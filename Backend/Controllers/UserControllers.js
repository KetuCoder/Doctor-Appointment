import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import UserModel from '../Models/UserModel.js'
import { v2 as cloudinary } from 'cloudinary'
import DoctorModel from '../Models/DoctorModel.js'
import AppointmentModel from '../Models/Appointment.js'

export const RegisterUser = async (req,res) => {
    try {
        const { name , email , password } = req.body;
        // if(!name || !email || !password){
        //     return res.json({ Success : false , Message : "Missing Details !"})
        // }
        if(!validator.isEmail(email)){
            return res.json({ Success : false , Message : "Incorrect Email !"})
        }
        const hash = await bcrypt.hash(password,10);
        const userData = { email , name , password : hash }
        const newUser = UserModel(userData);
        const user = await newUser.save()
        const token = jwt.sign({id:user._id},process.env.TOKEN_JWT,{ expiresIn : "10h" });
        res.json({ Success : true , token });
    } catch (error) {
        console.log(error)
        return res.json({ Success : false , Message : "Internal Server Error!"})
    }

}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDYwZWM0ZGY1NmViODMyZjU1Y2VjMSIsImlhdCI6MTcyODQ1MDI0NH0._gobXilEYAE6_xI7a4d0iA9e82PouUqn_fAZfTT1U9I

export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ Success: false, Message: "Email Is Not Found!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.TOKEN_JWT);
            return res.json({ Success: true, token });
        } else {
            return res.json({ Success: false, Message: "Invalid Password!" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ Success: false, Message: "Internal Server Error!" });
    }
};

export const GetProfile = async (req,res) => {
    try {
        const { userId } = req.body;
        const userData = await UserModel.findById(userId).select('-password')
        res.json({ Success : true , userData })
    } catch (error) {
        console.log(error);
        return res.json({ Success: false, Message: "Internal Server Error!" });
    }
}

export const UpdateProfile = async (req,res) => {
    try {
        const { userId , name , phone , address , gender , dob } = req.body;
        const imageFile = req.file;
        if(!name || !phone || !gender || !dob){
            return res.json({ Success : false , Message : "Missing Details !" })
        }
        await UserModel.findByIdAndUpdate(userId,{name,phone,gender,dob})
        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageUrl = imageUpload.secure_url

            await UserModel.findByIdAndUpdate(userId,{image:imageUrl})
        }
        res.json({ Success : true , Message : "Profile Updated !" });
    } catch (error) {
        console.log(error);
        return res.json({ Success: false, Message: "Internal Server Error!" });
    }
}

export const Appointment = async (req,res) => {
    try {
        const { userId , docId , slotDate , slotTime } = req.body;
        const docData = await DoctorModel.findById(docId).select('-password');
        if(!docData.available){
            return res.json({ Success : false , Message : "Doctor Not Available !" })
        }
        let slots_booked = docData.slots_booked;
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({ Success : false , Message : "Slot Not Available !"})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        const userData = await UserModel.findById(userId).select('-password');
        delete docData.slots_booked

        const appointmentsData = { userId , docId , userData , docData , amount : docData.fees , slotTime , slotDate , date : Date.now() };
        const newAppointment = new AppointmentModel(appointmentsData);
        await newAppointment.save()

        await DoctorModel.findByIdAndUpdate(docId,{slots_booked});

        res.json({ Success : true , Message : "Appointment Booked !" });

    } catch (error) {
        console.log(error);
        return res.json({ Success: false, Message: "Internal Server Error!" });
    }
}

export const ListAppointment = async (req,res) => {
    try {
        const { userId } = req.body;
        const appointments = await AppointmentModel.find({userId})
        res.json({ Success : true , appointments });
    } catch (error) {
        console.log(error);
        return res.json({ Success: false, Message: "Internal Server Error!" });
    }
}

export const CancleAppointment = async (req,res) => {
    try {
        const { userId , appointmentId } = req.body;
        const appointmentData = await AppointmentModel.findById(appointmentId)
        if(appointmentData.userId !== userId){
            return res.json({ Success : false , Message : "UnAuthorized Action" })
        }
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
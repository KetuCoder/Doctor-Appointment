import DoctorModel from "../Models/DoctorModel.js";
import bcyrpt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const ChangeAvailablity = async (req,res) => {
    try {
        const { docId } = req.body;
        const docData = await DoctorModel.findById(docId);
        await DoctorModel.findByIdAndUpdate(docId,{available : !docData.available});
        res.json({ Success : true , Message : "Availability Changed !"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const AllDoctors = async (req,res) => {
    try {
      const Doctors = await DoctorModel.find({}).select(['-password','-email']);
      return res.json({ Success : true , Doctors });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

export const LoginDoctor = async (req,res) => {
    try {
        const { email , password } = req.body;
        const doctor = await DoctorModel.findOne({email});
        if(!doctor){
            return res.json({ Success : false , Message : "InValid Credentials "});
        }
        const isMatch = await bcyrpt.compare(password,doctor.password);
        if(isMatch){
            const token = jwt.sign({id:doctor._id},process.env.TOKEN)
            res.json({ Success : true , token });
        }else{
            res.json({ Success : false , Message : "InValid Credentials "})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDRlOGY3ODU2NjUyNzY4OWY3ZWQzNSIsImlhdCI6MTcyODQ3MzM4OH0._-i4gL2_pOFPOJgEdLQUsbBqBZDeZRIsKhRXaVwKPvg
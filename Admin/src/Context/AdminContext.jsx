import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

export const AdminContextProvider = (props) => {

    const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData] = useState(false)

    const [doctors,setDoctors] = useState([])
    const getallDoctors = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list',{},{headers:{aToken}})
            if(data.Success){
                setDoctors(data.Doctors);
            }else{
                toast.error(data.Message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.Message)
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability',{docId},{headers:{aToken}})
            if(data.Success){
                toast.success(data.Success);
                getallDoctors()
            }else{
                toast.error(data.Message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.Message)
        }
    }

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/appointments',{headers:{aToken}})
            if(data.Success){
                setAppointments(data.appointments)
            }else{
                toast.error(data.Message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const AppointmentCancel = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
            if(data.Success){
                toast.success(data.Message)
                getallDoctors()
            }else{
                toast.error(data.Message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}});
            if(data.Success){
                setDashData(data.dashData)
            }else{
                toast.error(data.Message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const value = {
        backendUrl , setAToken , aToken , getallDoctors , doctors , changeAvailability , getAllAppointments , appointments , setAppointments ,
        AppointmentCancel , getDashData , dashData
    }

    return(
        <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>
    )
}
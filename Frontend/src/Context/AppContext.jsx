import { createContext } from "react";
// import { doctors } from "../assets/assets";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import { toast } from 'react-toastify'

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const currency = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors,setDoctors] = useState([])
    const [userData,setUserData] = useState(false)

    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'')

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if(data.Success){
                setDoctors(data.Doctors)
            }else{
                toast.error(data.Message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.Message)
        }
    }

    const UserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
            if(data.Success){
                setUserData(data.userData);
            }else{
                toast.error(data.Message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.Message)
        }
    }

    useEffect(()=>{
        if(token){
            UserProfileData()
        }else{
            setUserData(false)
        }
    },[token])


    useEffect(()=>{
        getDoctorsData()
    })

    const value = {
        doctors , currency , backendUrl , token , setToken , userData , UserProfileData , setUserData , getDoctorsData
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
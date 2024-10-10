import React, { useContext , useState } from 'react'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { useEffect } from 'react';
import { toast } from 'react-toastify'

export default function MyAppointments() {
  const { backendUrl , token , getDoctorsData } = useContext(AppContext);

  const [appointments,setAppointments] = useState([]);
  const months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + ' ' + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments',{headers:{token}})
      if(data.Success){
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error);
      toast
    }
  }

  const CancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}});
      if(data.Success){
        toast.success(data.Message);
        getUserAppointments()
        getDoctorsData()
      }else{
        toast.error(data.Message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.Message)
    }
  }

  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  })

  return (
    <div>
      <p className='font-medium text-zinc-700 pb-3 mt-12 border-b '>My Appointments</p>
      <div className="">
        {
          appointments.map((item,index)=>(
            <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
              <div className="">
                <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                {/* <p className='text-zinc-700 font-medium mt-1'>Address : </p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p> */}
                <p className='text-xs mt-16'><span className='text-sm text-neutral-700 font-medium'>Date & Time : </span>{slotDateFormat(item.slotDate)} || {item.slotTime}</p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end">
                {/* {
                  ! item.cancelled &&
                  <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Payment</button>
                } */}
                {
                  ! item.cancelled && 
                  <button onClick={()=>CancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>
                }
                {
                  item.cancelled && <button className='sm:min-w-48 py-2 border border-red-600 rounded text-red-500 '>Cancelled Appointment</button>
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
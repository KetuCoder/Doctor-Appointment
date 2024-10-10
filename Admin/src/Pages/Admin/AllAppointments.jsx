import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/AdminContext";
import { AppContext } from "../../Context/AppContext";
import { assets } from "../../assets/assets";

export default function AllAppointments() {
  const { getAllAppointments, appointments, aToken , AppointmentCancel } = useContext(AdminContext);
  const { calculateAge , slotDateFormat , currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] w-[1500px] overflow-y-scroll ">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {
          appointments.reverse().map((item,index)=>(
            <div key={index} className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-200">
              <p className="max-sm:hidden">{index+1}</p>
              <div className="flex items-center gap-2">
                <img className="w-8 rounded-full" src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime} </p>
              <div className="flex items-center gap-2">
                <img className="w-8 rounded-full bg-gray-200" src={item.docData.image} alt="" /> <p>{item.docData.name}</p>
              </div>
              <p>{currency}{item.amount}</p>
              {
               item.cancelled ? <p className="text-red-400 text-xs font-medium ">Cancelled</p> : <img onClick={()=>AppointmentCancel(item._id)} src={assets.cancel_icon} className="w-10 cursor-pointer" alt="" /> }
            </div>
          ))
        }

      </div>
    </div>
  );
}
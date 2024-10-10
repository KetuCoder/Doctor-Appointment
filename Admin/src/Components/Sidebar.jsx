import React, { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../Context/DoctorContext';

export default function Sidebar() {

    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);

  return (
    <div className='min-h-screen bg-white border-r w-[300px]'>
      {
        aToken && <ul className='text-[#515151] mt-5'>
            <NavLink to={'/admin-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-13 md:px-9 md:min-w-32 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                <img src={assets.home_icon} alt="" />
                <p>DashBoard</p>
            </NavLink>
            <NavLink to={'/all-appointments'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-13 md:px-9 md:min-w-32 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                <img src={assets.appointment_icon} alt="" />
                <p>All Appointments</p>
            </NavLink>
            <NavLink to={'/add-doctor'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-13 md:px-9 md:min-w-32 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                <img src={assets.add_icon} alt="" />
                <p>Add Doctor</p>
            </NavLink>
            <NavLink to={'/doctor-list'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-13 md:px-9 md:min-w-32 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                <img src={assets.people_icon} alt="" />
                <p>Doctors List</p>
            </NavLink>
        </ul>
      }

      {
        dToken && <ul className='text-[#515151] mt-5'>
            <NavLink to={'/doctor-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-13 md:px-9 md:min-w-32 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                <img src={assets.home_icon} alt="" />
                <p>DashBoard</p>
            </NavLink>
            <NavLink to={'/doctor-appointments'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-13 md:px-9 md:min-w-32 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                <img src={assets.appointment_icon} alt="" />
                <p>All Appointments</p>
            </NavLink>
            <NavLink to={'/doctor-profile'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-13 md:px-9 md:min-w-32 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
                <img src={assets.people_icon} alt="" />
                <p>Profile</p>
            </NavLink>
        </ul>
      }
    </div>
  )
}

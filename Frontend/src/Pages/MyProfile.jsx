import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify'

export default function MyProfile() {
  
  // const [userData,setUserData] = useState({
  //   name : "Ketan Ambure",
  //   image : assets.profile_pic,
  //   email : 'ambureketan@gmail.com',
  //   phone : '+91 766644 6754',
  //   address : {
  //     line1 : '57th Cross, Richmod',
  //     line2 : 'Circle, Savarkar Road, Mumbai , Maharashtra'
  //   },
  //   gender : 'Male',
  //   dob : '04--4-2004'
  // })

  const { token , userData , backendUrl , setUserData , UserProfileData } = useContext(AppContext);

  const [isEdit,setIsEdit] = useState(true);
  const [image,setImage] = useState(false)

  const updateProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      // formData.append('address',userData.address)
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)
      image && formData.append('image',image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}})
      if(data.Success){
        toast.success(data.Message)
        await UserProfileData()
        setIsEdit(false)
        setImage(false)
      }else{
        toast.error(data.Message)
      }

    } catch (error) {
      console.log(error)
    }
  }


  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>

      {
        isEdit ? <label htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
              <img src={image ? URL.createObjectURL(image) : userData.image} className='w-36 rounded opactiy-75 ' alt="" />
              <img src={image ? '' : assets.upload_icon} alt="" className='w-10 absolute bottom-12 right-12' />
            </div>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden />
        </label> :
        <img className='w-36 rounded' src={userData.image} alt="" />
      }

      {
        isEdit ? <input type="text" className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' onChange={e => setUserData(pre => ({...pre,name:e.target.value}))} value={userData.name} /> : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />

      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email Id : </p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone</p>
          {
            isEdit ? <input className='bg-gray-100 max-w-32' type="text" onChange={e => setUserData(pre => ({...pre,phone:e.target.value}))} value={userData.phone} /> : <p className='text-blue-400'>{userData.phone}</p>
          }
          {/* <p className='font-medium '>Address</p>
          {
            isEdit ? <p>
              <input className='bg-gray-50' type="text" onChange={(e)=>setUserData(pre => ({...pre,address:{...pre.address,line1:e.target.value}}))} value={userData.address.line1} />
              <br />
              <input className='bg-gray-50' type="text" onChange={(e)=>setUserData(pre => ({...pre,address:{...pre.address,line2:e.target.value}}))} value={userData.address.line2} />
            </p> :
            <p className='text-gray-500'>{userData.address.line1}
            <br />{userData.address.line2}</p>
          } */}
        </div>
      </div>
      
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender</p>
          {
            isEdit ? <select className='max-w-20 bg-gray-100' onChange={(e)=>setUserData(pre=>({...pre,gender:e.target.value}))} value={userData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select> :
            <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>BirthDay</p>
          {
            isEdit ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e)=>setUserData(pre=>({...pre,dob:e.target.value}))} value={userData.dob} /> :
            <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-10'>
        {
          isEdit ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={updateProfileData}>Save Information</button>
           : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>

    </div>
  )
}

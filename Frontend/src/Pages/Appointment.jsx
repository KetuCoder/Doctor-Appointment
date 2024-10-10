import React, { useContext, useEffect, useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../Components/RelatedDoctors';
import { toast } from 'react-toastify'
import axios from 'axios'

export default function Appointment() {
  const { docId } = useParams();
  const navigate = useNavigate()
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const { doctors , currency , backendUrl , getDoctorsData , token } = useContext(AppContext);
  const [docInfo,setDocInfo] = useState(null);

  const [docSlots,setDocSlots] = useState([])
  const [slotIndex,setSlotIndex] = useState(0)
  const [slotTime,setSlotTime] = useState('');

  const fetchDoctors = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    let today = new Date()

    for(let i=0; i<7; i++){
      let currDate = new Date(today)
      currDate.setDate(today.getDate()+i)

      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)

      if(today.getDate() == currDate.getDate()){
        currDate.setHours(currDate.getHours() > 10 ? currDate.getHours()+1:10)
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0)
      }else{
        currDate.setHours(10)
        currDate.setMinutes(0)
      }
      let timeSlots = []
      while(currDate < endTime){
        let formattedTime = currDate.toLocaleTimeString([],{hour:'2-digit' , minute : '2-digit' })
        
        let day = currDate.getDate()
        let month = currDate.getMonth() + 1
        let year = currDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if(isSlotAvailable){
          timeSlots.push({
            datetime : new Date(currDate),
            time : formattedTime
          })
        }
        currDate.setMinutes(currDate.getMinutes()+30)
      }
      setDocSlots(pre => ([...pre, timeSlots]))
    }
  } 

  const BookAppointment = async () => {
    if(!token){
      toast.warn("Login To Book Appointment")
      return navigate('/login')
    }

    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})
      if(data.Success){
        toast.success(data.Message)
        getDoctorsData()
        navigate('/my-appointments')
      }else{
        toast.error(data.Message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getAvailableSlots()
  }, [docInfo])

  useEffect(()=>{ 
    fetchDoctors()
  }, [doctors,docId])

  useEffect(()=>{
    console.log(docSlots)
  }, [docSlots])

  return docInfo &&(
    <div>
      <div className='flex flex-col sm:flex-row gap-4 '>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg ' src={docInfo.image} alt="" />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" />
          </p>

          <div className='mt-2 flex items-center gap-2 text-sm text-gray-600'>
            {docInfo.degree} - {docInfo.speciality} 
            <button className='py-0.5 px-2 border text-xs rounded-full '>{docInfo.experience}</button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='mt-2 text-sm text-gray-500 max-w-[700px] '>{docInfo.about}</p>
          </div>
          <p className=' text-gray-500 font-medium mt-4'>Appointment Fee : <span className='text-gray-600'>{currency}{docInfo.fees}</span></p>
        </div>
      </div>

      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4 ">
          {
            docSlots.length && docSlots.map((item,index)=>(
              <div onClick={()=>setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200 '}`}>
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length && docSlots[slotIndex].map((item,index)=>(
              <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-semibold border border-gray-300' }`} key={index}>{item.time.toLowerCase()}</p>
            ))}
        </div>
        
        <button onClick={BookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book An Appointment</button>
      </div>
      
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}  />
      
    </div>
  )
}

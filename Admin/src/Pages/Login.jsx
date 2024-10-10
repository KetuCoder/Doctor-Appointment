import React, { useContext, useState } from 'react'
import { AdminContext } from '../Context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { DoctorContext } from '../Context/DoctorContext'

export default function Login() {

  const [state,setState] = useState('Admin')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const { setAToken , backendUrl } = useContext(AdminContext);
  const { dtoken , setDToken } = useContext(DoctorContext);

  const OnSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      if(state === 'Admin'){
        const { data } = await axios.post(backendUrl + '/api/admin/login', {email,password})
        if(data.Success){
            localStorage.setItem('aToken',data.Token)
            setAToken(data.Token)
        }else{
          toast.error(data.Message)
        }
      }else{
        const { data } = await axios.post(backendUrl + '/api/doctor/login',{email,password});
        if(data.Success){
          localStorage.setItem('dToken',data.token)
          setDToken(data.token)
        }else{
          toast.error(data.Message)
        }
      }

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <form onSubmit={OnSubmitHandler} className='min-h-[80vh] flex items-center '>
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state === 'Admin' ? 'Admin' : 'Doctor' }</span> Login</p>
          <div className='w-full'>
            <p>Email</p>
            <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className='w-full'>
            <p>Password</p>
            <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
          {/* {
            state === 'Admin' ? <p>Doctor Login ? <span onClick={()=>setState('Doctor')} className='text-primary underline font-serif'>Click Here</span></p> :
            <p>Admin Login ? <span onClick={()=>setState('Admin')} className='text-primary font-serif underline'>Click Here</span></p>
          } */}
        </div>
    </form>
  )
}

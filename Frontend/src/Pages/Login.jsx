import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react';

export default function Login() {

    const [state,setState] = useState('Sign Up');
    const navigate = useNavigate();
    const { backendUrl , setToken , token } = useContext(AppContext);

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const OnSubmit = async (e) => {
        e.preventDefault()
        try {
            if(state == 'Sign Up'){
                const { data } = await axios.post(backendUrl + '/api/user/register',{name,email,password});
                if(data.Success){
                    localStorage.setItem('token',data.token)
                    setToken(data.token)
                    toast.success(data.Success)
                }else{
                    toast.error(data.Message)
                }
            }else{
                const { data } = await axios.post(backendUrl + '/api/user/login',{email,password});
                if(data.Success){
                    localStorage.setItem('token',data.token)
                    setToken(data.token)
                    toast.success(data.Success)
                }else{
                    toast.error(data.Message)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(token){
            navigate('/ ')
        }
    },[token])

  return (
    <form onSubmit={OnSubmit} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
            <p className='text-2xl font-semibold '>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
            <p>Please {state === 'Sign Up' ? 'Sign Up' : 'Log In'} To Book Appointment</p>
            {
                state === 'Sign Up' ?
            <div className='w-full'>
                <p>Full Name</p>
                <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name} />
            </div> : '' }
            <div className='w-full'>
                <p>Email</p>
                <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} />
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create Account' : 'Log In'}</button>
            {
                state === "Sign Up" ?
             <p>Already Have An Account ? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Login')}>Login Here</span></p> :
             <p >Create An Account ? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Sign Up')}>Click Here</span></p>
            }
        </div>
    </form>
  )
}

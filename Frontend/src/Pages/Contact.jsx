import React from 'react'
import { assets } from '../assets/assets'

export default function Contact() {
  return (
    <div>
    
    <div className='text-center text-2xl pt-10 text-gray-500 '>
        <p>CONTACT <span className='text-gray-700 font-semibold '>US</span></p>
    </div>

    <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm '>
        <img src={assets.contact_image} className='w-full md:max-w-[360px] ' alt="" />

        <div className="flex flex-col justify-center items-start gap-6 ">
            <p className='font-semibold text-lg text-gray-600'>Our OFFICE</p>
            <p className='text-gray-500'>08745 Anitilia Tower, <br /> Ambani Chowk Mumbai , Maharashtra</p>
            <p className='text-gray-500'>Tel : (+91) 766644 6754 <br />ambureketan@gmail.com</p>
            <p className='font-semibold text-lg text-gray-600'>Careers At PRESCRIPTO</p>
            <p className='text-gray-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <button className='border border-black px-8 py-4 text-sm hover:text-white hover:bg-black transition-all duration-500'>Explore Jobs</button>
        </div>
    </div>
      
    </div>
  )
}

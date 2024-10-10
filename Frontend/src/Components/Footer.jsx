import React from 'react'
import { assets } from '../assets/assets'

export default function Footer() {
  return (
    <div className='md:mx-10'>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">

        {/* left side */}
        <div className="">
            <img src={assets.logo} className="mb-5 w-40" alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, totam? Ab fugiat voluptate suscipit. Ab sunt harum hic quaerat asperiores facilis minus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam?</p>
        </div>

        {/* center side */}
        <div className="">
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600 '>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policies</li>
            </ul>
        </div>

        {/* right side */}
        <div className="">
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='w-full md:w-2/3 text-gray-600 leading-6'>
                <li>+91 766644 6754</li>
                <li>ambureketan@gmail.com</li>
            </ul>
        </div>
        </div>

      {/* copyright text */}
      <div>
        <hr  />
        <p className='py-5 text-sm text-center'>Copyright 2024@ Prescripto - All Right Reserved.</p>
      </div>
    </div>
  )
}

import React from 'react'
import { assets } from '../assets/assets'

export default function About() {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

     <div className="my-10 flex flex-col md:flex-row gap-12">
        <img src={assets.about_image} alt="" className='w-full md:max-w-[360px]' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 '>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit velit nemo, numquam quis, rerum dolore earum debitis
             ad dignissimos tempora, illum ab soluta voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus.
             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni aliquam rem porro.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque quia beatae dolor voluptates, vero doloribus amet cumque 
            culpa illo dolorum, architecto, quasi consequuntur porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat 
            sunt soluta ducimus iure veniam explicabo debitis consectetur non.</p>
            <b className='text-gray-800'>Our Vision</b>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur quaerat voluptates accusantium sit dolorum rem ipsum quas
             tenetur repellat nulla? Corrupti, eum rem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla sit dolore commodi ullam ut voluptate.</p>
        </div>
     </div>

     <div>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
     </div>

     <div className="mt-4 flex flex-col md:flex-row mb-20">
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
            <b>Efficiency</b>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat eum illo quia debitis magni quasi.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
            <b>Convenience</b>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem error, fuga inventore quae incidunt et.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
            <b>Personlization</b>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus minus ipsum impedit odit eaque vitae?</p>
        </div>
     </div>

    </div>
  )
}

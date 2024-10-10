import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function RelatedDoctors({ docId , speciality }) {
    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();

    const [relDoctors, setRelDoctors] = useState([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            // Use filter to get an array of related doctors
            const doctorData = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId);
            setRelDoctors(doctorData);
        }
    }, [doctors, speciality, docId]);

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors To Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing distinctio adipisci.</p>
            <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
                {
                    relDoctors.map((item, index) => (
                        <div
                            onClick={() => {navigate(`/appointments/${item._id}`); scrollTo(0,0)}}
                            key={index}
                            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                        >
                            <img className='bg-blue-50 ' src={item.image} alt="" />
                            <div className='p-4'>
                                <div className='flex items-center gap-2 text-sm text-center text-green-500 '>
                                    <p className='w-2 h-2 bg-green-500 rounded-full '></p><p>Available</p>
                                </div>
                                <p className='text-gray-900 text-lg font-medium '>{item.name}</p>
                                <p className='text-gray-600 text-sm'>{item.speciality}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <button onClick={() => navigate('/doctors')} className='bg-blue-200 font-semibold text-gray-600 px-12 py-3 rounded-full mt-10'>More </button>
        </div>
    );
}

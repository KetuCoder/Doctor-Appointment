import React from 'react'
import Header from '../Components/Header'
import SpecilaityMenu from '../Components/SpecilaityMenu'
import TopDoctors from '../Components/TopDoctors'
import Banner from '../Components/Banner'

export default function Home() {
  return (
    <div>
     <Header />
     <SpecilaityMenu />
     <TopDoctors />
     <Banner />
    </div>
  )
}

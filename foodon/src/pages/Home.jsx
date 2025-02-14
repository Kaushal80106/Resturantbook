import React from 'react'
import HeroSection from '../Components/HeroSection'
import About from '../Components/About'
import Quality from '../Components/Quality'
import Menu from '../Components/Menu'
import Services from '../Components/Services'
import Team from '../Components/Team'

import Reservation from '../Components/Reservation'
import Footer from '../Components/Footer'
function Home() {
  return (
   <>
   <HeroSection/>
   <About/>
   <Quality/>
   <Menu/>
   <Services/>
   <Team/>
   <Reservation/>
   <Footer/>
   </>
  )
}

export default Home
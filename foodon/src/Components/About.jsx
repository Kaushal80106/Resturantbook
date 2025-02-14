import React from 'react'
import { Link } from 'react-router-dom'
import {HiOutlineArrowNarrowRight} from 'react-icons/hi'
function About() {
  return (
   <section className='about' id='about'>
     <div className="container">
         <div className="banner">
            <div className="top">
                <h1 className="heading">ABOUT US</h1>
                <p>The only thing we'are serious about is food</p>
            </div>
            <p className="mid">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim hic explicabo maxime ratione laboriosam animi nulla veritatis? Omnis,
                 quidem. Esse error molestias doloremque nostrum eaque? Alias omnis aliquid a, magni nostrum qui nulla volupt
                as quas hic in ullam expedita ipsam sint natus maxime quod officiis, ab blanditiis error ut aliquam.
            </p>
            <Link to="/">Explore Menu <span>
              <HiOutlineArrowNarrowRight/>
                </span></Link>
         </div>
         <div className="banner">
            <img src="/about.png" alt="about" />
         </div>
     </div>
   </section>
  )
}

export default About
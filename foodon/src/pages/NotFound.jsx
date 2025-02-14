import React from 'react'
import {HiOutlineArrowNarrowRight} from 'react-icons/hi'
import { Link } from 'react-router-dom'
function NotFound() {
  return (
  <>
  <section className="notFound">
     <div className="container">
       <img src="/notFound.svg" alt="notFound" />
       <h1>LOOKS LIKE YOU'RE LOST</h1>
       <p>we can't find the page ur looking for</p>
       <Link to={"/"}>Back To Home <span><HiOutlineArrowNarrowRight/></span></Link>
     </div>
  </section>
  </>
  )
}

export default NotFound
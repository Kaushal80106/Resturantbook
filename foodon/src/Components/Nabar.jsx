import React, { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi"
import { data } from '../restApi.json'

function Nabar() {
    const [show, setshow] = useState(false);
    const navigate = useNavigate();

    return (
        <nav>
            <div className='logo'>khuf</div>
            <div className={show ? "navLinks showmenu " : "navLinks"}>
                <div className="links">
                    {
                        data[0].navbarLinks.map(element => {
                            return (
                                <ScrollLink to={element.link} key={element.id} spy={true} smooth={true} duration={500}>
                                    {element.title}
                                </ScrollLink>
                            );
                        })
                    }
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button 
                        className="menuBtn" 
                        onClick={() => navigate('/admin')} 
                        style={{ backgroundColor: "#ff5733", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold" }}
                    >
                        ADMIN
                    </button>
                    <button className="menuBtn">OUR MENU</button>
                </div>
            </div>
            <div className="hamburger" onClick={() => setshow(!show)}>
                <GiHamburgerMenu />
            </div>
        </nav>
    )
}

export default Nabar
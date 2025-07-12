import React, { useContext, useState } from 'react'
import logo_dark from '../assets/navbar/logo_dark.svg';
import logo_light from '../assets/navbar/logo_light.svg';
import '../styles/Navbar.css';
import { ThemeContext } from '../ThemeContext';
import ModeButton from './ModeButton';
export default function Navbar() {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setIsHamburgerOpen(prev => !prev);
    }
    return (
        <>
            <div className='navbar-desktop'>
                <div className='container navbar-inner'>
                    <img src={logo_dark} alt="" className='logo' />
                    <ul className="nav-links">
                        <li>Explore</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                    <div className='search-box'>
                        <input type="text" placeholder='Search' />
                        <i className="bi bi-search"></i>
                    </div>
                    <div className="nav-buttons">
                        <ModeButton />
                        <button className='btn-login btn-layout'>Login</button>
                        <button className='btn-cart btn-layout'><i className="bi bi-basket-fill"></i></button>
                    </div>
                </div>

            </div>
            {/* For Tablet && Mobile  */}
            <div className=' navbar-mobile' >
                <div className="container">
                    <div className='navbar-mobile-top'>
                        <div>
                            <button className='btn-menu' onClick={toggleHamburger}><i className="bi bi-list"></i></button>
                            <img src={logo_dark} alt="" className='logo' />
                            </div>
                        <div className="nav-buttons">
                            <ModeButton />
                            <button className='btn-login btn-layout'>Login</button>
                            <button className='btn-cart-mobile btn-layout'><i className="bi bi-basket-fill"></i></button>
                        </div>
                    </div>

                    <div className='search-box search-box-mobile'>
                        <input type="text" placeholder='Search' />
                        <i className="bi bi-search"></i>
                    </div>
                </div>
            </div>

            {/* Hamburger menu  */}
            <div className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}>
                <ul>
                <li onClick={toggleHamburger}>Explore</li>
                </ul>
                <button className="close-btn" onClick={toggleHamburger}>×</button>
            </div>
        </>
    )
}

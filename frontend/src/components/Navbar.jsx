import React, { useContext, useState } from 'react'
import logo_dark from '../assets/navbar/logo_dark.svg';
import logo_light from '../assets/navbar/logo_light.svg';
import '../styles/Navbar.css';
import { ThemeContext } from '../ThemeContext';
import ModeButton from './ModeButton';
import Form from './Form';
import { Link } from 'react-router';

export default function Navbar() {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('USERNAME'));
    const toggleHamburger = () => {
        setIsHamburgerOpen(prev => !prev);
    }
    const [showLogin, setShowLogin] = useState(false);

    const toggleLogin = () => setShowLogin(!showLogin);

    const logout =() =>{
        localStorage.clear();
        setUsername(null);
    }
    return (
        <>
            <div className='navbar-desktop'>
                <div className='container navbar-inner'>
                    <Link to={'/'}><img src={logo_dark} alt="" className='logo' /></Link>
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
                        { username ? (
                            <button className='btn-login btn-layout' onClick={logout}>{username}</button>
                        ): (
                            <button className='btn-login btn-layout' onClick={toggleLogin}>Login</button>
                        )}
                            {showLogin && (
                                <Form toggleLogin={toggleLogin}  UpdateUsername={setUsername}/>
                            )}
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
                            <Link to={'/'}><img src={logo_dark} alt="" className='logo' /></Link>
                        </div>
                        <div className="nav-buttons">
                            <ModeButton />
                            <button className='btn-login btn-layout' onClick={toggleLogin}>Login</button>
                            {showLogin && (
                                <Form toggleLogin={toggleLogin} />
                            )}
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

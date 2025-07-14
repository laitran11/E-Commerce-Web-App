import React, { useState, useEffect } from 'react'
import logo_dark from '../assets/navbar/logo_dark.svg';
import logo_light from '../assets/navbar/logo_light.svg';
import '../styles/Navbar.css';
import { ThemeContext } from '../ThemeContext';
import ModeButton from './ModeButton';
import Form from './Form';
import { Link, useNavigate } from 'react-router';
import { getCartItems } from '../services/cartService';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('USERNAME'));
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const {cartItems} = useCart();

    const toggleHamburger = () => {
        setIsHamburgerOpen(prev => !prev);
    }
    const [showLogin, setShowLogin] = useState(false);

    const toggleLogin = () => setShowLogin(!showLogin);

    const logout = () => {
        localStorage.clear();
        setUsername(null);
    }
    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?name=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

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
                        <input type="text"
                            placeholder='Search'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown} />
                        <i className="bi bi-search"></i>
                    </div>
                    <div className="nav-buttons">
                        <ModeButton />
                        {username ? (
                            <button className='btn-login btn-layout' onClick={logout}><i className="bi bi-person-fill"></i> {username}</button>
                        ) : (
                            <button className='btn-login btn-layout' onClick={toggleLogin}>Login</button>
                        )}
                        {showLogin && (
                            <Form toggleLogin={toggleLogin} UpdateUsername={setUsername} />
                        )}
                        <Link to={`/cart`}><button className='btn-cart-mobile btn-layout btn-wrapper'>
                            <span className='count-items-badge'>{cartItems.length}</span>
                            <i className="bi bi-basket-fill"></i></button></Link>
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
                            {username ? (
                                <button className='btn-login btn-layout' onClick={logout}><i className="bi bi-person-fill"></i> {username}</button>
                            ) : (
                                <button className='btn-login btn-layout' onClick={toggleLogin}>Login</button>
                            )}
                            {showLogin && (
                                <Form toggleLogin={toggleLogin} />
                            )}
                            <Link to={`/cart`}><button className='btn-cart-mobile btn-layout btn-wrapper'>
                            <span className='count-items-badge'>{cartItems.length}</span>
                            <i className="bi bi-basket-fill"></i></button></Link>
                        </div>
                    </div>

                    <div className='search-box search-box-mobile'>
                        <input type="text"
                            placeholder='Search'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown} />
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

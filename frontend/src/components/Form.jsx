import React, { use, useState } from 'react'
import '../styles/Form.css';
import logo_light from '../assets/navbar/logo_light.svg';
import {login, register} from '../services/authService';
import { useNavigate } from "react-router";

export default function Form({ toggleLogin, UpdateUsername }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            let res;
            if (isLogin){
                res = await login(username, password);
                localStorage.setItem('ACCESS_TOKEN', res.data.access);
                localStorage.setItem('REFRESH_TOKEN', res.data.refresh);
                localStorage.setItem('USERNAME', username);
                UpdateUsername(username);
                toggleLogin();
            }else{
                res = await register(firstname, lastname, username, email, password);
                toggleLogin();
            }
        }
        catch (error){
            console.error('Error during authentication:', error);
            alert(error.message || 'An error occurred');
        }
        finally {
            setLoading(false);}
    };

    return (
        <div className="modal-overlay" onClick={toggleLogin}>
            <div className="login-form" onClick={(e) => e.stopPropagation()}>
                <div className='form-header'>
                    <div></div>
                    <img src={logo_light} alt="" className='logo' />
                    <button className="close" onClick={(e) => { e.stopPropagation(); toggleLogin(); }}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                {isLogin ? (
                    <>
                        <h3>Login</h3>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                        <button type="submit" className="submit-btn" onClick={() => setIsLogin(true)}>Login</button>
                        <button className='sign-up-btn' onClick={() => setIsLogin(false)}>Sign up</button>
                    </>
                ): (
                    <>
                        <h3>Sign Up</h3>
                        <div className="name-row">
                            <input type="text" placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                            <input type="text" placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        </div>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" className="submit-btn">Sign Up</button>
                        <div className='toggle-form-btn' >Already have an account? <button className='toggle-btn' onClick={() => setIsLogin(true)}>Login</button></div>
                    </>
                )}
                </form>
            </div>
        </div>
    )
}

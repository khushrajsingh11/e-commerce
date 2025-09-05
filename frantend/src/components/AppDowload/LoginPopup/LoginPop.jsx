import React, { useContext, useState } from 'react';
import './LoginPop.css';
import { assets } from '../../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

function LoginPop({ setShowLogin }) {
    const [currState, setCurrState] = useState("Sign Up");

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
    };
   
    const { url, setToken } = useContext(StoreContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newurl = url;
        
        if (currState === 'Sign Up') {
            newurl += "/api/user/register";
        } else {
            newurl += "/api/user/login";
        }
        
        try {
            const response = await axios.post(newurl, data);
            
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                setShowLogin(false);
                console.log(response.data.message); 
                window.location.reload();
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Login/Register error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className='login-popup'>
            <form className='login-popup-container' onSubmit={handleSubmit}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img 
                        onClick={() => setShowLogin(false)} 
                        src={assets.cross_icon} 
                        alt="Close" 
                    />
                </div>
                
                <div className="login-popup-inputs">
                    {currState === 'Sign Up' && (
                        <input 
                            type='text' 
                            name='name'
                            onChange={onChangeHandler} 
                            value={data.name} 
                            placeholder='Your name' 
                            required 
                        />
                    )}
                    <input 
                        type="email" 
                        placeholder='Your email' 
                        name='email' 
                        onChange={onChangeHandler} 
                        value={data.email} 
                        required 
                    />
                    <input 
                        type="password" 
                        name='password' 
                        onChange={onChangeHandler} 
                        value={data.password} 
                        placeholder='Your password' 
                        required 
                    />
                </div>

                <button type="submit">
                    {currState === 'Sign Up' ? "Create Account" : "Login"}
                </button>
                
                <div className='login-popup-condition'>
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the Terms of Use & Privacy Policy.</p>
                </div>

                {currState === "Sign Up" ? (
                    <p>
                        Already have an account? 
                        <span onClick={() => setCurrState("Login")}> Login here</span>
                    </p>
                ) : (
                    <p>
                        Create a new account? 
                        <span onClick={() => setCurrState("Sign Up")}> Click here</span>
                    </p>
                )}
            </form>
        </div>
    );
}

export default LoginPop;

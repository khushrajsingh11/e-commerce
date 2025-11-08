import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <Link to='/' className="logo">Zayaka</Link>
                <p>Your trusted food delivery partner, bringing delicious meals right to your doorstep with fast and reliable service.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="Facebook" />
                    <img src={assets.twitter_icon} alt="Twitter" />
                    <img src={assets.linkedin_icon} alt="LinkedIn" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-131-234-7655</li>
                    <li>contact@Zayaka.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 Zayaka. All rights reserved.</p>
    </div>
  )
}

export default Footer

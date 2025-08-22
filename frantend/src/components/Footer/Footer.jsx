import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
function Footer() {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus rerum itaque temporibus?</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>Home</ul>
                <ul>About</ul>
                <ul>Delivery</ul>
                <ul>Privacy policy</ul>

            </div>
            <div className="footer-content-right">
                <h2>GET IIN TOUCH</h2>
                <ul>
                    <li>+1-131-234-7655</li>
                    <li>contect@tmato.com</li>
                </ul>
            </div>
            </div>
            <hr />
            <p className='footer-copyright'>  Copyright 2022. All rights reserved.</p>
       
    </div>
  )
}

export default Footer
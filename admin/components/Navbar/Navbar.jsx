import React from 'react';
import './Navbar.css';
import { assets } from '../../src/assets/assets.js';

function Navbar() {
  return (
    <div className='navbar'>
       <h1 className='logo'>Zayaka</h1>
       <img className='profile' src={assets.profile_image} alt="Profile" />
    </div>
  );
}

export default Navbar;

import React from 'react'
import './AppDowload.css'
import { assets } from '../../assets/assets'

function AppDownload() {
  return (
    <div className='app-download' id='app-download'>
      <div className='app-download-content'>
        <p className='app-download-text'>
          For Better Experience Download <br /> Tomato App
        </p>
        <div className='app-download-platforms'>
          <img 
            src={assets.play_store} 
            alt="Download from Google Play Store" 
            className='store-badge'
          />
          <img 
            src={assets.app_store} 
            alt="Download from Apple App Store" 
            className='store-badge'
          />
        </div>
      </div>
    </div>
  )
}

export default AppDownload
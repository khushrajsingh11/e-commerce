import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route , Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Card from './pages/Cart/Card'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import './App.css'
import LoginPop from './components/AppDowload/LoginPopup/LoginPop'

import VerifyOrder from './pages/verifyOrder/VerifyOrder';
import MyOrders from './pages/MyOrders/MyOrders';




function App() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
     {showLogin?<LoginPop setShowLogin={setShowLogin}/>:<> </>}
     <Navbar setShowLogin= {setShowLogin} />
     <div className="App">
     
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element = {<Card/>}/>
        <Route path='/order' element = {<PlaceOrder/>}/>
        <Route path='/verify' element={<VerifyOrder/>}/>
        <Route path='/myorders' element={<MyOrders/>} />

      </Routes>

     </div>
     <Footer/>
    </>
  )
}

export default App

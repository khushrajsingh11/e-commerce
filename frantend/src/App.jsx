import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Card from "./pages/Cart/Card";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPop from "./components/AppDowload/LoginPopup/LoginPop";
import VerifyOrder from "./pages/VerifyOrder/VerifyOrder.jsx";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";

function App() {
  const [token, setToken] = useState(null);
  const [showLogin, setShowLogin] = useState(false); // Add this state

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  return (
    <>
      {/* Show login popup when showLogin is true AND no token exists */}
      {showLogin && !token && (
        <LoginPop setToken={setToken} setShowLogin={setShowLogin} />
      )}
      
      {!token ? (
        // If no token → show a landing page or login prompt
        <div>
          <Navbar setShowLogin={setShowLogin} />
          <div>Please log in to continue</div>
        </div>
      ) : (
        // If token exists → show full app
        <>
          <Navbar setShowLogin={setShowLogin} />
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Card />} />
              <Route path="/order" element={<PlaceOrder />} />
              <Route path="/verify" element={<VerifyOrder />} />
              <Route path="/myorders" element={<MyOrders />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;

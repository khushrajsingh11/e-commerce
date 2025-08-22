import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

function Navbar({setShowLogin}) {
    const [menu, setMenu] = useState("home");
    const [isOpen, setIsOpen] = useState(false);
    const {token, setToken, getTotalCartAmount} = useContext(StoreContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate(); 
    
    const handleMenuClick = (menuItem) => {
        setMenu(menuItem);
        setIsOpen(false); 
    };

    const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    }

    return (
        <nav className="navbar">
            {/* Logo changed from image to text */}
            <Link to='/' className="logo">Zayaka</Link>
            
            <ul className={`Navbar-menu ${isOpen ? "open" : ""}`}>
                <li>
                    <Link to="/" onClick={() => handleMenuClick("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                </li>
                <li>
                    <a href="#explore-menu" onClick={() => handleMenuClick("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                </li>
                <li>
                    <a href="#app-download" onClick={() => handleMenuClick("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
                </li>
                <li>
                    <a href="#footer" onClick={() => handleMenuClick("contact")} className={menu === "contact" ? "active" : ""}>Contact Us</a>
                </li>
            </ul>

            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search" className="icon" />
                <div className="navbar-search-icon">
                    <Link to='/cart'> <img src={assets.basket_icon} alt="Basket" className="icon" />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
            {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>:
              <div className="navbar-profile" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
              <img src={assets.profile_icon} alt="" />
              {showDropdown && (
                <ul className="navbar-profile-dropdown">
                  <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                  <hr />
                  <li onClick={logout}>
                      <img src={assets.logout_icon} alt="" />
                      <p>Logout</p>
                  </li>
                </ul>
              )}
            </div>
            }

                <div 
                    className={`menu-toggle ${isOpen ? "open" : ""}`} 
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
import React, { useState, useContext, useRef, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate(); 
  const dropdownTimeout = useRef(null);
  const searchRef = useRef(null);

  const { token, setToken, getTotalCartAmount, food_list } = useContext(StoreContext);

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    setIsOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    setShowLogin(false);
    setShowDropdown(false);
    window.location.reload();
  };

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  const filteredItems = (food_list || []).filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Link to='/' className="logo">Zayaka</Link>
      
      <ul className={`Navbar-menu ${isOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={() => handleMenuClick("home")} className={menu === "home" ? "active" : ""}>Home</Link></li>
        <li><a href="#explore-menu" onClick={() => handleMenuClick("menu")} className={menu === "menu" ? "active" : ""}>Menu</a></li>
        <li><a href="#app-download" onClick={() => handleMenuClick("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a></li>
        <li><a href="#footer" onClick={() => handleMenuClick("contact")} className={menu === "contact" ? "active" : ""}>Contact Us</a></li>
      </ul>

      <div className="navbar-right">
        
        <div className="navbar-search" ref={searchRef}>
          <img
            src={showSearch ? assets.cross_icon : assets.search_icon}
            alt={showSearch ? "Close" : "Search"}
            className="icon"
            onClick={() => setShowSearch(!showSearch)}
          />
          
          {showSearch && (
            <>
              <input
                type="text"
                placeholder="Search food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                autoFocus
              />
              {searchTerm && (
                <div className="search-results">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <div
                        key={item._id}
                        className="search-result-item"
                        onClick={() => {
                          navigate(`/food/${item._id}`);
                          setSearchTerm("");
                          setShowSearch(false);
                        }}
                      >
                        <img src={item.image} alt={item.name} className="search-result-img" />
                        <span>{item.name}</span>
                      </div>
                    ))
                  ) : (
                    <p className="no-results">No results found</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* 🛒 Cart */}
        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="Basket" className="icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        
        {/* 👤 Login/Profile */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div 
            className="navbar-profile" 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={assets.profile_icon} alt="Profile" />
            {showDropdown && (
              <ul 
                className="navbar-profile-dropdown"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <li onClick={() => navigate('/myorders')}>
                  <img src={assets.bag_icon} alt="Orders" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}

        {/* ☰ Mobile Toggle */}
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

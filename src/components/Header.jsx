import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLogin();
    window.addEventListener('storage', checkLogin);

    return () => {
      window.removeEventListener('storage', checkLogin);
    };
  }, []);

  const toggleMenu = () => setIsMobile(!isMobile);
  const closeMenu = () => setIsMobile(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <nav className="navbar">
        {/* Logo */}
        <div className="logo-container">
          <a href="/">
            <img src={logo} alt="Techen Logo" className="logo-img" />
          </a>
        </div>

        {/* Links */}
        <ul className={isMobile ? 'nav-links-mobile' : 'nav-links'} onClick={closeMenu}>
          <li><a href="/">Home</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/quote">Request a Service</a></li>
          <li><a href="/contact">Contact</a></li>

          {!isLoggedIn ? (
  <>
    <li><a href="/register">Register</a></li>
    <li><a href="/login">Login</a></li>
  </>
) : (
  <>
    <li><a href="/account">Account</a></li>
    <li>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </li>
  </>
)}
        </ul>

        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMobile ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
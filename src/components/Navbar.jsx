import React, { useState } from "react";
import "./Navbar.css"; // create this file

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">Techen</div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      {/* Menu Links */}
      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/quote">Request a Service</a></li>
        <li><a href="/myrequests">My Requests</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/register">Register</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

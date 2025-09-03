import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaArrowUp } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Show scroll-to-top button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#fff', padding: '40px 20px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        
        {/* Company Info */}
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{ marginBottom: '10px' }}>Techen</h3>
          <p>Professional tech services for individuals and businesses. Let's bring your digital idea to life.</p>
        </div>

        {/* Quick Links */}
        <div style={{ flex: '1 1 200px' }}>
          <h4>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/" style={linkStyle}>Home</Link></li>
            <li><Link to="/services" style={linkStyle}>Services</Link></li>
            <li><Link to="/about" style={linkStyle}>About</Link></li>
            <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div style={{ flex: '1 1 250px' }}>
          <h4>Contact Info</h4>
          <p>Email: <a href="mailto:info@techen.com" style={linkStyle}>info@techen.com</a></p>
          <p>Phone: <a href="tel:+2347037580420" style={linkStyle}>+234 703 758 0420</a></p>
          <p>Address: 12 Arubiewe Street, Off Enerhen Road, Effurun, Delta State, Nigeria</p>
        </div>

        {/* Social Icons */}
        <div style={{ flex: '1 1 200px' }}>
          <h4>Follow Us</h4>
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={iconStyle}><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" style={iconStyle}><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={iconStyle}><FaLinkedinIn /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={iconStyle}><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="footer-logo">
        <a href="/">
          <img src={logo} alt="Techen Logo" className="footer-logo-img" />
        </a>
      </div>

      {/* Bottom Note */}
      <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '14px', borderTop: '1px solid #444', paddingTop: '20px' }}>
        &copy; {new Date().getFullYear()} Techen. All rights reserved.
      </div>

      {/* Scroll To Top */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            background: '#00bfa6',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            color: '#fff',
            fontSize: '20px',
            cursor: 'pointer',
            zIndex: 1000
          }}
          title="Back to Top"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

const linkStyle = {
  color: '#ddd',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '8px'
};

const iconStyle = {
  color: '#ddd',
  fontSize: '20px',
  textDecoration: 'none'
};

export default Footer;
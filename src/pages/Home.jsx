import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Testimonials from '../components/Testimonials/Testimonials';
import { FaUserPlus, FaClipboardList, FaBell, FaTruck } from "react-icons/fa";

const Home = () => {
  const [showScroll, setShowScroll] = useState(false);

 useEffect(() => {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => observer.observe(el));

  return () => {
    revealElements.forEach((el) => observer.unobserve(el));
  };
}, []);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const services = [
    { title: "Web Development", img: "/images/Web.png" },
    { title: "Mobile App Design", img: "/images/mobile.png" },
    { title: "Graphic Design", img: "/images/Graphic.png" },
    { title: "Branding", img: "/images/branding.png" },
    { title: "SEO Optimization", img: "/images/seo.png" },
    { title: "Marketing", img: "/images/marketing.png" },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section reveal">
        <div className="container">
          <h1>Welcome to Techen</h1>
          <p>Your one-stop platform for <br /> tech services—web development, design, and more.</p>
          <Link to="/quote">
            <button className="quote-btn">Request a Service</button>
          </Link>
        </div>
      </div>

      {/* Services Section */}
      <section className="services-section reveal">
      <section className="section-light-grey reveal">
  <h2>Our Services</h2>
  <div className="services-grid">
    {services.map((service, index) => (
      <div className="service-card" key={index}>
        <img src={service.img} alt={service.title} className="service-img" />
      </div>
    ))}
  </div> 
  <Link to="/quote">
            <button className="quote-btn">Request a Service</button>
          </Link>
</section>
</section>

      {/* How It Works */}
      <section className="how-it-works reveal">
        <h2>How It Works</h2>
        <div className="container steps">
          {[
            { icon: <FaUserPlus size={50} />, title: "Create Account", desc: "Register to get started." },
            { icon: <FaClipboardList size={50} />, title: "Request Service", desc: "Choose your desired service." },
            { icon: <FaBell size={50} />, title: "Get Notified", desc: "Admin gets notified instantly." },
            { icon: <FaTruck size={50} />, title: "Delivery", desc: "Receive high-quality output." },
          ].map((item, index) => (
            <div className="step" key={index}>
              <div className="step-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section reveal">
  <Testimonials />
</section>

      {/* About Section */}
      <section className="about-section reveal">
        <div className="container">
          <h2>About Techen</h2>
          <p>
            Techen is built for individuals and businesses who need fast, reliable, <br /> and professional tech services without the stress of looking for freelancers.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section reveal">
        <div className="container">
          <h2>Contact Us</h2>
          <form className="contact-form">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Your message..." rows={4}></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

      {/* Scroll to Top */}
      {showScroll && (
  <button className="scroll-top-btn" onClick={scrollToTop}>
    ↑
  </button>
)}
    </div>
  );
};

export default Home;
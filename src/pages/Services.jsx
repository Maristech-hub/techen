import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const services = [
  { title: "Web Development", img: "/images/Web.png" },
  { title: "Mobile App Design", img: "/images/mobile.png" },
  { title: "Graphic Design", img: "/images/Graphic.png" },
  { title: "Branding", img: "/images/branding.png" },
  { title: "SEO Optimization", img: "/images/seo.png" },
  { title: "Marketing", img: "/images/marketing.png" },
];

const Services = () => {
  useEffect(() => {
    const revealSection = document.querySelector('.services-section');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealSection.classList.add('slide-in');
          observer.unobserve(revealSection);
        }
      },
      { threshold: 0.2 }
    );

    if (revealSection) observer.observe(revealSection);
  }, []);

  return (
    <section className="services-section">
      <h2 className="section-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.img} alt={service.title} className="service-img" />
            <h3>{service.title}</h3>
          </div>
        ))}
      </div>
      <Link to="/quote">
        <button className="quote-btn">Request a Service</button>
      </Link>
    </section>
  );
};

export default Services;
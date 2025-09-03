import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    img: '/images/corpman.png',
    name: 'Charles Eze',
    text: 'The team at Techen transformed my idea into a beautiful website.',
  },
  {
    img: '/images/corplady.png',
    name: 'Jane Dami',
    text: 'I was amazed by their professionalism and quick delivery!',
  },
  {
    img: '/images/whiteman.png',
    name: 'Mike Johnson',
    text: 'Their graphic design services helped my brand stand out.',
  },
  {
    img: '/images/Afrilady.png',
    name: 'Linda Francisca',
    text: 'I highly recommend Techen for top-notch tech services.',
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">What Our Clients Say</h2>
      <div className="testimonial-slider">
        <div className="slider-track">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="testimonial">
              <img
                src={t.img}
                alt={t.name}
                className="testimonial-img"
              />
              <p className="testimonial-text">{t.text}</p>
              <h4 className="testimonial-name">{t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
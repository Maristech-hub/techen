import React, { useState } from 'react';
import './Contact.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Replace alert with toast
    toast.success('Message sent successfully!', {
      position: "top-right",
      autoClose: 3000, // closes after 3s
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact">
      <div className="contact-container">
        {/* Top flex: Image + Info */}
        <div className="top-flex">
          <div className="contact-image">
            <img src="/images/customer-care.webp" alt="Customer Care" />
          </div>
          <div className="contact-info">
            <h4>Contact Us</h4>
            <p>Email: <a href="mailto:info@techen.com">info@techen.com</a></p>
            <p>Phone: +2347084784615</p>
            <p>Address: 12 Arubiewe Street, Effurun, Delta State</p>
          </div>
        </div>

        {/* Contact Form below */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="text" 
            name="subject" 
            placeholder="Subject" 
            value={formData.subject} 
            onChange={handleChange} 
          />
          <textarea 
            name="message" 
            rows="5" 
            placeholder="Your Message" 
            value={formData.message} 
            onChange={handleChange} 
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Toastify container */}
      <ToastContainer />
    </section>
  );
};

export default Contact;

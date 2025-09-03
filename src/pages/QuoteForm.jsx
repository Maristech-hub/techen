import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './QuoteForm.css';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Something went wrong');
      }

      toast.success('Request submitted successfully!');
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (err) {
      console.error('❌ Error:', err);
      toast.error(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quote-form-container">
      <form className="quote-form" onSubmit={handleSubmit}>
        <h2> Request a Service</h2>

        <div className="form-row">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Chuks Dave"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="chuks@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Select a Service</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose a Service --</option>
            <option value="Web Development">Web Development</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="SEO Optimization">SEO Optimization</option>
            <option value="Marketing">Marketing</option>
            <option value="Branding">Branding</option>
            <option value="Tech Consultancy">Tech Consultancy</option>
          </select>
        </div>

        <div className="form-group">
          <label>Project Description</label>
          <textarea
            name="message"
            rows="5"
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>

      {/* Toast Container for Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default QuoteForm;

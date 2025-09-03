import axios from 'axios';

// Use env variable so you don’t hardcode Render URL
// const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/auth';
const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/auth`;

export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/register`, userData);
    return res.data;
  } catch (err) {
    console.error('Register error:', err.response?.data || err.message);
    throw err;
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/login`, userData);
    return res.data;
  } catch (err) {
    console.error('Login error:', err.response?.data || err.message);
    throw err;
  }
};
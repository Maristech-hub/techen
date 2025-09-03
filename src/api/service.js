// service.js
import axios from 'axios';

const API_BASE_URL = '/api'; // vite proxy will forward to backend

export const createServiceRequest = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/service-requests`, formData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating service request:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchServiceRequests = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/service-requests`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service requests:', error);
    throw error;
  }
};

export const approveServiceRequest = async (id) => {
  return axios.patch(`${API_BASE_URL}/service-requests/${id}/approve`);
};

export const completeServiceRequest = async (id) => {
  return axios.patch(`${API_BASE_URL}/service-requests/${id}/complete`);
};

export const deleteServiceRequest = async (id) => {
  return axios.delete(`${API_BASE_URL}/service-requests/${id}`);
};
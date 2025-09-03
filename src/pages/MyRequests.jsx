import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../api/service";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token'); // store token at login

        const response = await axios.get(`${API_BASE_URL}/requests/my`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setRequests(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load your requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Service Requests</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && requests.length === 0 && <p>No requests submitted yet.</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {requests.map((req) => (
          <li
            key={req._id}
            style={{
              marginBottom: '15px',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px'
            }}
          >
            <p><strong>Service:</strong> {req.serviceType}</p>
            <p><strong>Description:</strong> {req.description}</p>
            <p><small><strong>Submitted:</strong> {new Date(req.createdAt).toLocaleString()}</small></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyRequests;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";
import API_BASE_URL from "../api/service";

const Account = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard"); // default is dashboard
  const [isLoading, setIsLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [editMode, setEditMode] = useState(false);

  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch user profile
        const res = await fetch(`${API_BASE_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const userData = await res.json();
        setUserInfo({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || ""
        });

        // Fetch requests
        const reqRes = await fetch(`${API_BASE_URL}/requests/my-requests`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (reqRes.ok) {
          const reqData = await reqRes.json();
          setRequests(reqData || []);
        }
      } catch (err) {
        console.error("Error fetching account data:", err);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE_URL}/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userInfo)
      });

      if (!res.ok) throw new Error();
      alert("✅ Profile updated successfully!");
      setEditMode(false);
    } catch {
      alert("❌ Could not update profile");
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      alert("New passwords do not match.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE_URL}/users/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.newPass
        })
      });

      if (!res.ok) throw new Error();
      alert("✅ Password changed successfully!");
      setPasswords({ current: "", newPass: "", confirm: "" });
      setActiveTab("dashboard");
    } catch {
      alert("❌ Could not change password");
    }
  };

  if (isLoading) return <p>Loading your account...</p>;

  // Requests split
  const pendingRequests = requests.filter(r => r.status === "pending");
  const completedRequests = requests.filter(r => r.status === "completed");

  return (
    <div className="account-dashboard">
      {/* Sidebar */}
      <aside className="account-sidebar">
        <h2>My Account</h2>
        <ul>
          <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
            🏠 Dashboard
          </li>
          <li className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
            👤 Profile
          </li>
          <li className={activeTab === "password" ? "active" : ""} onClick={() => setActiveTab("password")}>
            🔑 Change Password
          </li>
          <li className={activeTab === "requests" ? "active" : ""} onClick={() => setActiveTab("requests")}>
            📋 My Requests
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="account-content">
        {activeTab === "dashboard" && (
          <div className="account-section dashboard-overview">
            <h3>Welcome, {userInfo.name} 👋</h3>
            <p>Here’s an overview of your account:</p>
            <div className="dashboard-cards">
              <div className="card">
                <h4>{requests.length}</h4>
                <p>Total Requests</p>
              </div>
              <div className="card">
                <h4>{pendingRequests.length}</h4>
                <p>Pending</p>
              </div>
              <div className="card">
                <h4>{completedRequests.length}</h4>
                <p>Completed</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="account-section">
            <h3>Profile Information</h3>
            <form onSubmit={submitProfile}>
              <label>
                Full Name:
                <input type="text" name="name" value={userInfo.name} onChange={handleProfileChange} disabled={!editMode} />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={userInfo.email} onChange={handleProfileChange} disabled={!editMode} />
              </label>
              <label>
                Phone:
                <input type="text" name="phone" value={userInfo.phone} onChange={handleProfileChange} disabled={!editMode} />
              </label>
              <label>
                Address:
                <input type="text" name="address" value={userInfo.address} onChange={handleProfileChange} disabled={!editMode} />
              </label>

              {editMode ? (
                <button type="submit" className="save-btn">Save Changes</button>
              ) : (
                <button type="button" className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
              )}
            </form>
          </div>
        )}

        {activeTab === "password" && (
          <div className="account-section">
            <h3>Change Password</h3>
            <form onSubmit={submitPassword} className="password-form">
              <input type="password" name="current" placeholder="Current Password" value={passwords.current} onChange={handlePasswordChange} required />
              <input type="password" name="newPass" placeholder="New Password" value={passwords.newPass} onChange={handlePasswordChange} required />
              <input type="password" name="confirm" placeholder="Confirm New Password" value={passwords.confirm} onChange={handlePasswordChange} required />
              <button type="submit" className="save-btn">Update Password</button>
            </form>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="account-section">
            <h3>My Service Requests</h3>

            <div className="order-history">
              <h4>Pending Requests</h4>
              {pendingRequests.length > 0 ? (
                <ul>
                  {pendingRequests.map(req => (
                    <li key={req._id}>
                      <strong>{req.service}</strong> — {new Date(req.createdAt).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No pending requests.</p>
              )}
            </div>

            <div className="order-history">
              <h4>Completed Requests</h4>
              {completedRequests.length > 0 ? (
                <ul>
                  {completedRequests.map(req => (
                    <li key={req._id}>
                      <strong>{req.service}</strong> — Completed on {new Date(req.updatedAt).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No completed requests yet.</p>
              )}
            </div>

            <div className="order-history">
              <h4>Request History</h4>
              {requests.length > 0 ? (
                <ul>
                  {requests.map(req => (
                    <li key={req._id}>
                      <strong>{req.service}</strong> — {req.status} <br />
                      <em>{req.message}</em>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No service requests found.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Account;
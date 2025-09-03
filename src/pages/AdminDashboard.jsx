import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]); // ✅ Users state
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard"); // ✅ Default to Dashboard

  // ================== FETCH REQUESTS ==================
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch requests");

      const data = await res.json();
      setRequests(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setLoading(false);
    }
  };

  // ================== FETCH USERS ==================
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // ================== REQUEST ACTIONS ==================
  const updateRequest = async (id, action, value = null) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/requests/${id}/${action}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: value ? JSON.stringify({ value }) : null,
      });
      fetchRequests(); // Refresh after update
    } catch (err) {
      console.error("Error updating request:", err);
    }
  };

  const handleApprove = (id) => updateRequest(id, "approve");
  const handleComplete = (id) => updateRequest(id, "complete");
  const handleUpdateStatus = (id, status) => updateRequest(id, "status", status);

  const handleDeleteRequest = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/requests/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRequests();
    } catch (err) {
      console.error("Error deleting request:", err);
    }
  };

  // ================== USER ACTIONS ==================
  const handleRoleChange = async (id, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/users/admin/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });
      fetchUsers();
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/users/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // ================== LOAD DATA ==================
  useEffect(() => {
    fetchRequests();
    fetchUsers();
  }, []);

  // ✅ Dashboard stats
  const totalRequests = requests.length;
  const pending = requests.filter((r) => r.status === "pending").length;
  const approved = requests.filter((r) => r.status === "approved").length;
  const completed = requests.filter((r) => r.status === "completed").length;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul>
          <li
            className={activeMenu === "dashboard" ? "active" : ""}
            onClick={() => setActiveMenu("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={activeMenu === "requests" ? "active" : ""}
            onClick={() => setActiveMenu("requests")}
          >
            Manage Requests
          </li>
          <li
            className={activeMenu === "users" ? "active" : ""}
            onClick={() => setActiveMenu("users")}
          >
            Manage Users
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">Admin Dashboard</header>

        {/* ✅ Dashboard Overview */}
        {activeMenu === "dashboard" && (
          <section>
            <h3>Overview</h3>
            {loading ? (
              <p>Loading stats...</p>
            ) : (
              <div className="stats-grid">
                <div className="card">
                  <h4>Total Requests</h4>
                  <p>{totalRequests}</p>
                </div>
                <div className="card">
                  <h4>Pending</h4>
                  <p>{pending}</p>
                </div>
                <div className="card">
                  <h4>Approved</h4>
                  <p>{approved}</p>
                </div>
                <div className="card">
                  <h4>Completed</h4>
                  <p>{completed}</p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Requests Management */}
        {activeMenu === "requests" && (
          <section>
            <h3>Service Requests</h3>
            {loading ? (
              <p>Loading requests...</p>
            ) : (
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Service</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req._id}>
                      <td>
                        {req.name} <br />
                        <small>{req.email}</small>
                      </td>
                      <td>{req.service}</td>
                      <td>{req.message}</td>
                      <td>
                        <span className={`status ${req.status}`}>
                          {req.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn approve" onClick={() => handleApprove(req._id)}>Approve</button>
                        <button className="btn complete" onClick={() => handleComplete(req._id)}>Complete</button>
                        <select
                          className="status-select"
                          defaultValue=""
                          onChange={(e) => handleUpdateStatus(req._id, e.target.value)}
                        >
                          <option value="">-- Change Status --</option>
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button className="btn delete" onClick={() => handleDeleteRequest(req._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {/* Users Management */}
        {activeMenu === "users" && (
          <section>
            <h3>Manage Users</h3>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn delete"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

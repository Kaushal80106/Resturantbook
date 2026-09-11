import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Admin() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded password for basic protection
    if (password === "admin123") {
      setIsAuthenticated(true);
      fetchReservations();
    } else {
      toast.error("Incorrect password!");
    }
  };

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const backendUrl = (import.meta.env.VITE_BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");
      const { data } = await axios.get(`${backendUrl}/api/v1/reservation/all`);
      setReservations(data.reservations);
    } catch (error) {
      toast.error("Failed to fetch reservations");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <section style={{ padding: '5rem 2rem', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '0.5rem', fontSize: '1rem' }}
            />
            <button type="submit" style={{ padding: '0.5rem', background: '#ff5733', color: 'white', border: 'none', cursor: 'pointer' }}>Login</button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="admin_page" style={{ padding: '5rem 2rem', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem', color: '#333' }}>Admin Dashboard</h1>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading reservations...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <thead>
                <tr style={{ backgroundColor: '#ff5733', color: 'white' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Table</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Phone</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {reservations.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '1rem', textAlign: 'center' }}>No reservations found.</td>
                  </tr>
                ) : (
                  reservations.map((res) => (
                    <tr key={res._id} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '1rem', fontWeight: 'bold' }}>T{res.tableNumber}</td>
                      <td style={{ padding: '1rem' }}>{res.firstName} {res.lastName}</td>
                      <td style={{ padding: '1rem' }}>{res.email}</td>
                      <td style={{ padding: '1rem' }}>{res.phone}</td>
                      <td style={{ padding: '1rem' }}>{new Date(res.date).toLocaleDateString()}</td>
                      <td style={{ padding: '1rem' }}>{res.time}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Admin;


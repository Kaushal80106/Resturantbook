import React, { useState } from 'react'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Reservation() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Table selection state
  const [bookedTables, setBookedTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [step, setStep] = useState(1);

  const totalTables = Array.from({ length: 10 }, (_, i) => i + 1);

  const today = new Date().toISOString().split("T")[0];

  const checkAvailability = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      toast.error("Please select a date and time first.");
      return;
    }
    
    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
      const { data } = await axios.get(`${backendUrl}/api/v1/reservation/availability?date=${date}&time=${time}`);
      setBookedTables(data.bookedTables);
      setStep(2);
      setSelectedTable(null);
      toast.success("Availability checked! Select a table.");
    } catch (error) {
      toast.error("Failed to check availability.");
    } finally {
      setLoading(false);
    }
  };

  const handleReservation = async (e) => {
    e.preventDefault();

    if (!selectedTable) {
      toast.error("Please select a table from the grid.");
      return;
    }

    if (phone.length !== 10) {
      toast.error("Phone number must contain exactly 10 digits!");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address!");
      return;
    }

    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
      const { data } = await axios.post(`${backendUrl}/api/v1/reservation/send`,
        { firstName, lastName, email, phone, date, time, tableNumber: selectedTable },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setDate("");
      setPhone("");
      setTime("");
      setSelectedTable(null);
      setStep(1);
      navigate("/success");

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reservation.png" alt="res" />
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>BOOK A TABLE</h1>
            <p>Select your date and time to view available tables.</p>
            <form>
              {/* STEP 1: Date & Time */}
              <div className="input-row" style={{ width: '100%' }}>
                <input type="date"
                  placeholder="Date"
                  value={date}
                  min={today}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={step === 2}
                  style={{ flex: 1 }}
                />
                <input type="time"
                  placeholder="Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={step === 2}
                  style={{ flex: 1 }}
                />
              </div>

              {step === 1 && (
                <button type="button" onClick={checkAvailability} disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
                  {loading ? "CHECKING..." : "CHECK AVAILABILITY"} <span><HiOutlineArrowNarrowRight /></span>
                </button>
              )}

              {/* STEP 2: Table Selection & Details */}
              {step === 2 && (
                <div style={{ width: '100%', marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: '#333' }}>Select a Table</h3>
                    <button type="button" onClick={() => setStep(1)} style={{ padding: '5px 10px', fontSize: '0.8rem', background: '#ccc', color: '#333' }}>
                      Change Time
                    </button>
                  </div>
                  
                  {/* Visual Table Grid */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(5, 1fr)', 
                    gap: '10px', 
                    marginBottom: '1.5rem' 
                  }}>
                    {totalTables.map((tableNum) => {
                      const isBooked = bookedTables.includes(tableNum);
                      const isSelected = selectedTable === tableNum;
                      
                      let bgColor = '#e0e0e0';
                      let textColor = '#333';
                      let cursor = 'pointer';

                      if (isBooked) {
                        bgColor = '#ff4d4d';
                        textColor = '#fff';
                        cursor = 'not-allowed';
                      } else if (isSelected) {
                        bgColor = '#4caf50';
                        textColor = '#fff';
                      }

                      return (
                        <div 
                          key={tableNum}
                          onClick={() => !isBooked && setSelectedTable(tableNum)}
                          style={{
                            backgroundColor: bgColor,
                            color: textColor,
                            padding: '1rem 0',
                            textAlign: 'center',
                            borderRadius: '8px',
                            cursor: cursor,
                            fontWeight: 'bold',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                        >
                          T{tableNum}
                        </div>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '15px', height: '15px', background: '#e0e0e0', borderRadius: '3px' }}></div> Available</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '15px', height: '15px', background: '#4caf50', borderRadius: '3px' }}></div> Selected</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '15px', height: '15px', background: '#ff4d4d', borderRadius: '3px' }}></div> Booked</span>
                  </div>

                  {/* Personal Details */}
                  {selectedTable && (
                    <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                      <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Your Details (Table {selectedTable})</h3>
                      <div className="input-row">
                        <input type="text"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input type="text"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <div className="input-row">
                        <input type="email"
                          placeholder="Email"
                          value={email}
                          className="email_tag"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type="number"
                          placeholder="Phone no"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <button type="button" onClick={handleReservation} disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
                        {loading ? "SUBMITTING..." : "CONFIRM BOOKING"} <span><HiOutlineArrowNarrowRight /></span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reservation

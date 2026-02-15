import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [flights, setFlights] = useState([]);
  const [showFlights, setShowFlights] = useState(false);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");

  const mockFlights = [
    { id: 1, flight: "AI 203", from: "Mumbai", to: "Delhi", time: "10:30 AM", status: "On Time" },
    { id: 2, flight: "6E 502", from: "Pune", to: "Bangalore", time: "12:00 PM", status: "Delayed" },
    { id: 3, flight: "SG 119", from: "Goa", to: "Chennai", time: "4:15 PM", status: "On Time" },
    { id: 4, flight: "UK 808", from: "Hyderabad", to: "Kolkata", time: "6:45 PM", status: "Cancelled" },
    { id: 5, flight: "IX 309", from: "Delhi", to: "Pune", time: "8:00 AM", status: "On Time" },
  ];

  const handleSearchFlights = () => {
    const results = mockFlights.filter(
      (f) =>
        (!fromCity || f.from.toLowerCase() === fromCity.toLowerCase()) &&
        (!toCity || f.to.toLowerCase() === toCity.toLowerCase())
    );
    setFlights(results);
    setShowFlights(true);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>✈️ Flight Schedule</h1>

      <div style={styles.card}>
        <h2 style={styles.subtitle}>Select Flight Date</h2>
        <Calendar onChange={setDate} value={date} />

        <p style={styles.dateText}>
          <b>Selected Date:</b> {date.toDateString()}
        </p>

        <div style={styles.dropdownContainer}>
          <select
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            style={styles.dropdown}
          >
            <option value="">From</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Goa">Goa</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Delhi">Delhi</option>
          </select>

          <select
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            style={styles.dropdown}
          >
            <option value="">To</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Pune">Pune</option>
          </select>
        </div>

        <button onClick={handleSearchFlights} style={styles.button}>
          🔍 Search Flights
        </button>
      </div>

      {showFlights && (
        <div style={styles.resultsCard}>
          <h3 style={styles.flightTitle}>Available Flights</h3>

          {flights.length > 0 ? (
            flights.map((f) => (
              <div key={f.id} style={styles.flightCard}>
                <h4 style={styles.flightInfo}>{f.flight}</h4>
                <p>
                  {f.from} → {f.to}
                </p>
                <p>🕒 {f.time}</p>
                <p>
                  <b>Status:</b>{" "}
                  <span
                    style={{
                      color:
                        f.status === "On Time"
                          ? "#00C853"
                          : f.status === "Delayed"
                          ? "#FF8F00"
                          : "#D50000",
                      fontWeight: "bold",
                    }}
                  >
                    {f.status}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p style={styles.noFlights}>No flights found.</p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: "2.5rem",
    color: "#0d47a1",
    fontWeight: "700",
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
    width: "350px",
  },
  subtitle: {
    color: "#1e88e5",
    marginBottom: "15px",
  },
  dateText: {
    marginTop: "15px",
    fontSize: "1rem",
  },
  dropdownContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  dropdown: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "48%",
    fontSize: "1rem",
  },
  button: {
    marginTop: "20px",
    background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  resultsCard: {
    background: "#fff",
    marginTop: "30px",
    padding: "25px",
    borderRadius: "20px",
    width: "400px",
    boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
  },
  flightTitle: {
    textAlign: "center",
    color: "#1565c0",
    marginBottom: "15px",
  },
  flightCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "10px",
    background: "#f9f9f9",
    transition: "0.3s",
  },
  flightInfo: {
    margin: 0,
    color: "#1976d2",
  },
  noFlights: {
    textAlign: "center",
    color: "#999",
  },
};

export default CalendarPage;

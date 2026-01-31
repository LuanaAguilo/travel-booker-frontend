import { Link, Routes, Route, useLocation } from "react-router-dom";
import "./theme.css";

import HomeView from "./views/HomeView";
import CatalogView from "./views/CatalogView";
import BookingsView from "./views/BookingsView";
import { useState, useCallback } from "react";

function BookingsPage() {
  return <h2 style={{ color: "var(--color-text-light)" }}>My Bookings</h2>;
}
function ProfilePage() {
  return <h2 style={{ color: "var(--color-text-light)" }}>Profile</h2>;
}

export default function App() {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);

  // Add booking if not already booked
  const handleBook = useCallback((experience) => {
    setBookings((prev) => {
      if (prev.some((b) => b.id === experience.id)) return prev;
      return [...prev, experience];
    });
  }, []);

  // Remove booking by id
  const handleCancelBooking = useCallback((experience) => {
    setBookings((prev) => prev.filter((b) => b.id !== experience.id));
  }, []);

  const linkBase = {
    color: "rgba(255,255,255,0.88)",
    fontWeight: 400,
    textDecoration: "none",
    letterSpacing: 1.2,
    padding: "10px 14px",
    borderRadius: 999,
    transition: "all 160ms ease",
    textTransform: "uppercase",
    fontSize: 12,
  };

  const activeLink = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.14)",
    color: "#ffffff",
  };

  const navLinkStyle = (to) => ({
    ...linkBase,
    ...(location.pathname === to ? activeLink : {}),
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0e0e10",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        overflowX: "hidden",
        fontFamily:
          "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <header
        style={{
          width: "100%",
          background: "rgba(14,14,16,0.92)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "22px 16px 18px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: "1.85rem",
            fontWeight: 300,
            letterSpacing: 2.6,
          }}
        >
          Madrid Signature
        </h1>

        <nav style={{ display: "flex", gap: 18, marginTop: 14 }}>
          <Link style={navLinkStyle("/")} to="/">
            Home
          </Link>
          <Link style={navLinkStyle("/catalog")} to="/catalog">
            Catalog
          </Link>
          <Link style={navLinkStyle("/bookings")} to="/bookings">
            My Bookings
          </Link>
          <Link style={navLinkStyle("/profile")} to="/profile">
            Profile
          </Link>
        </nav>
      </header>

      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "1180px",
          margin: "26px auto",
          padding: "0 14px",
        }}
      >
        <Routes>
          <Route path="/" element={<HomeView onBook={handleBook} bookings={bookings} />} />
          <Route path="/catalog" element={<CatalogView onBook={handleBook} bookings={bookings} />} />
          <Route path="/bookings" element={<BookingsView bookings={bookings} onCancelBooking={handleCancelBooking} />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}

import { Link, Routes, Route, useLocation } from "react-router-dom";
import "./theme.css";

import HomeView from "./views/HomeView";
import BookingsView from "./views/BookingsView";
import { useState, useCallback } from "react";

function AboutView() {
  return (
    <div
      style={{
        color: "rgba(255,255,255,0.88)",
        lineHeight: 1.7,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "10px 0 30px",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: 16,
          color: "#fff",
          fontWeight: 300,
          letterSpacing: 1.4,
        }}
      >
        About
      </h2>

      <div
        style={{
          width: "100%",
          maxWidth: 520,
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.03)",
          boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
        }}
      >
        <img
          src="https://imgur.com/ynSHz41.jpg"
          alt="Alejandro Pérez Muñoz & Luana Aguilo"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
          loading="lazy"
        />
      </div>

      <div style={{ marginTop: 18, maxWidth: 560, padding: "0 10px" }}>
        <p style={{ marginTop: 5 }}>
          Madrid Signature was founded by <strong>Alejandro Pérez Muñoz</strong> and{" "}
          <strong>Luana Aguilo</strong> with a shared vision: to offer a level of access,
          discretion, and personalization that goes far beyond traditional bookings or tours.
        </p>

        <p>
          Alejandro, a Madrid native with a strong hospitality background, brings deep local knowledge,
          trusted relationships, and an instinct for the city's hidden rhythm. Luana, originally from
          Los Angeles, contributes over a decade of experience in luxury concierge and high-level client
          services, working with international clientele who expect precision, privacy, and seamless execution.
        </p>

        <p style={{ marginBottom: 14 }}>Together, they combine local access with global standards.</p>

        <p>
          From discreet culinary evenings and private cultural visits to chauffeured heritage journeys and
          VIP nightlife arrangements, every experience is handled personally and tailored to the guest's
          timing, preferences, and pace.
        </p>

        <p>
          Our role is simple: remove friction, open doors, and elevate your time in Madrid.
        </p>

        <p style={{ marginBottom: 0 }}>
          This service is designed for travelers who value efficiency, privacy, and experiences that feel
          effortless yet exceptional.
        </p>
      </div>
    </div>
  );
}

function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    dates: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", phone: "", experience: "", dates: "", message: "" });
      setTimeout(() => setSubmitStatus(""), 5000);
    }, 1000);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "#fff",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    transition: "all 180ms ease",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    opacity: 0.7,
    marginBottom: 8,
    textAlign: "left",
  };

  return (
    <div style={{ color: "rgba(255,255,255,0.88)", lineHeight: 1.7, padding: "10px 20px 50px" }}>
      <h2 style={{ marginTop: 0, marginBottom: 40, color: "#fff", fontWeight: 300, letterSpacing: 1.4, textAlign: "center", fontSize: "2rem" }}>
        Contact
      </h2>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: 32, 
        maxWidth: 1100, 
        margin: "0 auto",
        alignItems: "start"
      }}>
        {/* Left: Contact Form */}
        <div style={{ 
          borderRadius: 18, 
          border: "1px solid rgba(255,255,255,0.10)", 
          background: "rgba(255,255,255,0.03)", 
          boxShadow: "0 18px 60px rgba(0,0,0,0.35)", 
          padding: 32,
          height: "fit-content"
        }}>
          <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 400, letterSpacing: 1, marginBottom: 24 }}>
            Send us a message
          </h3>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={labelStyle}>Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Preferred Experience</label>
              <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g., Madrid Tapas After Dark" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Preferred Dates</label>
              <input type="text" name="dates" value={formData.dates} onChange={handleChange} placeholder="e.g., March 15-20, 2026" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Message *</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                rows={5} 
                style={{ 
                  ...inputStyle, 
                  resize: "vertical", 
                  minHeight: 120,
                  fontFamily: "inherit"
                }} 
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting} 
              style={{ 
                padding: "14px 28px", 
                borderRadius: 999, 
                border: "1px solid rgba(255,255,255,0.18)", 
                background: isSubmitting ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.1)", 
                color: "#fff", 
                fontSize: 12, 
                letterSpacing: 2, 
                textTransform: "uppercase", 
                fontWeight: 500, 
                cursor: isSubmitting ? "not-allowed" : "pointer", 
                transition: "all 180ms ease", 
                marginTop: 8 
              }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {submitStatus === "success" && (
              <div style={{ 
                padding: 14, 
                borderRadius: 10, 
                background: "rgba(34,197,94,0.12)", 
                border: "1px solid rgba(34,197,94,0.3)", 
                color: "#86efac", 
                fontSize: 13, 
                textAlign: "center" 
              }}>
                Message sent! We'll get back to you within 24 hours.
              </div>
            )}
          </form>
        </div>

        {/* Right: Contact Info & Quick Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Contact Details */}
          <div style={{ 
            borderRadius: 18, 
            border: "1px solid rgba(255,255,255,0.10)", 
            background: "rgba(255,255,255,0.03)", 
            boxShadow: "0 18px 60px rgba(0,0,0,0.35)", 
            padding: 32 
          }}>
            <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 400, letterSpacing: 1, marginBottom: 24 }}>
              Get in touch
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7 }}>Email</div>
                <div style={{ marginTop: 6, color: "#fff", fontSize: 15 }}>info@madridsignature.com</div>
              </div>

              <div>
                <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7 }}>WhatsApp</div>
                <div style={{ marginTop: 6, color: "#fff", fontSize: 15 }}>+34 609 366 269</div>
              </div>

              <div>
                <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7 }}>Hours</div>
                <div style={{ marginTop: 6, color: "#fff", fontSize: 15 }}>Daily 6:00–23:00</div>
              </div>
            </div>
          </div>

          {/* Quick Contact Buttons */}
          <div style={{ 
            borderRadius: 18, 
            border: "1px solid rgba(255,255,255,0.10)", 
            background: "rgba(255,255,255,0.03)", 
            boxShadow: "0 18px 60px rgba(0,0,0,0.35)", 
            padding: 32 
          }}>
            <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 400, letterSpacing: 1, marginBottom: 20 }}>
              Prefer instant contact?
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a 
                href="https://wa.me/34609366269" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: 10, 
                  padding: "14px 24px", 
                  borderRadius: 999, 
                  border: "1px solid rgba(37,211,102,0.3)", 
                  background: "rgba(37,211,102,0.08)", 
                  color: "#25D366", 
                  fontSize: 13, 
                  letterSpacing: 1.5, 
                  textTransform: "uppercase", 
                  fontWeight: 500, 
                  textDecoration: "none", 
                  transition: "all 180ms ease" 
                }}
              >
                <span style={{ fontSize: 18 }}>💬</span> Message on WhatsApp
              </a>

              <a 
                href="mailto:info@madridsignature.com" 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: 10, 
                  padding: "14px 24px", 
                  borderRadius: 999, 
                  border: "1px solid rgba(255,255,255,0.18)", 
                  background: "rgba(255,255,255,0.06)", 
                  color: "#fff", 
                  fontSize: 13, 
                  letterSpacing: 1.5, 
                  textTransform: "uppercase", 
                  fontWeight: 500, 
                  textDecoration: "none", 
                  transition: "all 180ms ease" 
                }}
              >
                <span style={{ fontSize: 18 }}>✉️</span> Send an Email
              </a>
            </div>

            <p style={{ marginTop: 20, marginBottom: 0, fontSize: 13, opacity: 0.7, lineHeight: 1.6 }}>
              We typically respond within 2-4 hours during business hours.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Responsive */}
      <style>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);

  const handleBook = useCallback((experience) => {
    setBookings((prev) => {
      if (prev.some((b) => b.id === experience.id)) return prev;
      return [...prev, experience];
    });
  }, []);

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

        <nav
          style={{
            display: "flex",
            gap: 18,
            marginTop: 14,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link style={navLinkStyle("/")} to="/">
            Home
          </Link>
          <Link style={navLinkStyle("/about")} to="/about">
            About
          </Link>
          <Link style={navLinkStyle("/bookings")} to="/bookings">
            Bookings
          </Link>
          <Link style={navLinkStyle("/contact")} to="/contact">
            Contact
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
          <Route path="/about" element={<AboutView />} />
          <Route
            path="/bookings"
            element={<BookingsView bookings={bookings} onCancelBooking={handleCancelBooking} />}
          />
          <Route path="/contact" element={<ContactView />} />
        </Routes>
      </main>
    </div>
  );
}
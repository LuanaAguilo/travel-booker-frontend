import { Link, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import "./theme.css";

import HomeView from "./views/HomeView";
import BookingsView from "./views/BookingsView";
import CategoryView from "./views/CategoryView";
import ExperienceDetailView from "./views/ExperienceDetailView";
import LoginModal from "./components/LoginModal";

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
          fontSize: "1.2rem",
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
  const location = useLocation();
  const prefilledExperience = location.state?.prefilledExperience || "";
  const prefilledDate = location.state?.prefilledDate || "";
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: prefilledExperience,
    dates: prefilledDate,
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
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: 32, 
        maxWidth: 1100, 
        margin: "0 auto",
        alignItems: "start"
      }}>
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
              <label style={labelStyle}>Preferred Date</label>
              <input type="date" name="dates" value={formData.dates} onChange={handleChange} style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows={5} 
                placeholder="Optional: Tell us more about your preferences..."
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
              {isSubmitting ? "Sending..." : "Send Request"}
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
                Request sent! We'll get back to you within 1 hour during business hours.
              </div>
            )}
          </form>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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
                <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7 }}>Address</div>
                <div style={{ marginTop: 6, color: "#fff", fontSize: 15 }}>Calle Ortega Y Gasset 6<br />28006, Madrid</div>
              </div>

              <div>
                <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7 }}>Hours</div>
                <div style={{ marginTop: 6, color: "#fff", fontSize: 15 }}>Daily 6:00–23:00</div>
              </div>
            </div>
          </div>

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
              We typically respond within 1 hour during business hours.
            </p>
          </div>
        </div>
      </div>

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
  const [wishlist, setWishlist] = useState([]);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('madrid_signature_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleBook = useCallback((experience) => {
    setBookings((prev) => {
      if (prev.some((b) => b.id === experience.id)) return prev;
      return [...prev, experience];
    });
  }, []);

  const handleCancelBooking = useCallback((experience) => {
    setBookings((prev) => prev.filter((b) => b.id !== experience.id));
  }, []);

  const handleAddToWishlist = useCallback((experience) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === experience.id);
      if (exists) {
        return prev.filter((item) => item.id !== experience.id);
      } else {
        return [...prev, experience];
      }
    });
  }, []);

  const handleRemoveFromWishlist = useCallback((experience) => {
    setWishlist((prev) => prev.filter((item) => item.id !== experience.id));
  }, []);

  const handleAddBookingRequest = useCallback((request) => {
    setBookingRequests((prev) => [...prev, {
      ...request,
      id: Date.now(),
      status: 'pending',
      submittedAt: new Date().toISOString()
    }]);
  }, []);

  const handleCancelRequest = useCallback((requestId) => {
    setBookingRequests((prev) => prev.filter((r) => r.id !== requestId));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('madrid_signature_user', JSON.stringify(userData));
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('madrid_signature_user');
    setShowProfileDropdown(false);
  };

  const linkBase = {
    color: "rgba(255,255,255,0.88)",
    fontWeight: 400,
    textDecoration: "none",
    letterSpacing: 1.2,
    padding: "10px 14px",
    transition: "all 160ms ease",
    textTransform: "uppercase",
    fontSize: 12,
  };

  const activeLink = {
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
        width: "100%",
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
          zIndex: 1000,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          willChange: "transform",
        }}
      >
        <div style={{ 
          width: "100%", 
          maxWidth: "1180px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ flex: 1 }} />
          
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

          {/* Profile/login section */}
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {user ? (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 180ms ease",
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>

                {/* Dropdown menu */}
                {showProfileDropdown && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    right: 0,
                    background: "rgba(20, 20, 22, 0.98)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 12,
                    padding: 8,
                    minWidth: 200,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.5)"
                  }}>
                    <div style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                      marginBottom: 8
                    }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 4 }}>
                        {user.name}
                      </div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                        {user.email}
                      </div>
                    </div>

                    <Link
                      to="/bookings"
                      onClick={() => setShowProfileDropdown(false)}
                      style={{
                        display: "block",
                        padding: "10px 16px",
                        color: "rgba(255,255,255,0.85)",
                        textDecoration: "none",
                        fontSize: 13,
                        borderRadius: 6,
                        transition: "all 180ms ease"
                      }}
                      onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.08)"}
                      onMouseLeave={(e) => e.target.style.background = "transparent"}
                    >
                      Your Experiences
                    </Link>

                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        padding: "10px 16px",
                        background: "transparent",
                        border: "none",
                        color: "rgba(255,255,255,0.85)",
                        textAlign: "left",
                        fontSize: 13,
                        cursor: "pointer",
                        borderRadius: 6,
                        transition: "all 180ms ease",
                        fontFamily: "inherit"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "rgba(239,68,68,0.1)";
                        e.target.style.color = "#ef4444";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "rgba(255,255,255,0.85)";
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 999,
                  padding: "8px 20px",
                  color: "#fff",
                  fontSize: 12,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 180ms ease",
                  fontFamily: "inherit"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>

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
            Your Experiences
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
          <Route path="/category/:categoryName" element={<CategoryView />} />
          <Route 
            path="/experience/:experienceId" 
            element={
              <ExperienceDetailView 
                onAddToWishlist={handleAddToWishlist}
                wishlist={wishlist}
                onAddBookingRequest={handleAddBookingRequest}
              />
            } 
          />
          <Route path="/about" element={<AboutView />} />
          <Route
            path="/bookings"
            element={
              <BookingsView 
                bookings={bookings}
                bookingRequests={bookingRequests}
                wishlist={wishlist}
                onCancelBooking={handleCancelBooking}
                onCancelRequest={handleCancelRequest}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                user={user}
              />
            }
          />
          <Route path="/contact" element={<ContactView />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          background: "rgba(14,14,16,0.95)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "60px 20px 40px",
          marginTop: "auto"
        }}
      >
        <div style={{
          maxWidth: "1180px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 48
        }}>
          {/* About section */}
          <div>
            <h3 style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: 300,
              letterSpacing: 1.5,
              marginTop: 0,
              marginBottom: 16
            }}>
              Madrid Signature
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              lineHeight: 1.7,
              margin: 0
            }}>
              Curated experiences in Madrid's finest establishments. We provide exclusive access to the city's hidden gems and cultural treasures.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{
              color: "#fff",
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: 1.8,
              textTransform: "uppercase",
              marginTop: 0,
              marginBottom: 16,
              opacity: 0.9
            }}>
              Quick Links
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link to="/" style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none", transition: "color 180ms ease" }}
                onMouseEnter={(e) => e.target.style.color = "#fff"}
                onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>
                Experiences
              </Link>
              <Link to="/about" style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none", transition: "color 180ms ease" }}
                onMouseEnter={(e) => e.target.style.color = "#fff"}
                onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>
                About Us
              </Link>
              <Link to="/bookings" style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none", transition: "color 180ms ease" }}
                onMouseEnter={(e) => e.target.style.color = "#fff"}
                onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>
                Your Experiences
              </Link>
              <Link to="/contact" style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none", transition: "color 180ms ease" }}
                onMouseEnter={(e) => e.target.style.color = "#fff"}
                onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>
                Contact
              </Link>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h4 style={{
              color: "#fff",
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: 1.8,
              textTransform: "uppercase",
              marginTop: 0,
              marginBottom: 16,
              opacity: 0.9
            }}>
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="mailto:info@madridsignature.com" style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none", transition: "color 180ms ease" }}
                onMouseEnter={(e) => e.target.style.color = "#fff"}
                onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>
                info@madridsignature.com
              </a>
              <a href="https://wa.me/34609366269" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none", transition: "color 180ms ease" }}
                onMouseEnter={(e) => e.target.style.color = "#fff"}
                onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>
                +34 609 366 269
              </a>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, margin: 0 }}>
                Calle Ortega Y Gasset 6<br />
                28006, Madrid
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          maxWidth: "1180px",
          margin: "40px auto 0",
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          textAlign: "center"
        }}>
          <p style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 13,
            margin: 0
          }}>
            © {new Date().getFullYear()} Madrid Signature. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Login modal */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}
console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);

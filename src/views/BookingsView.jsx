import { useNavigate, Link } from "react-router-dom";

function BookingsView({ bookings = [], bookingRequests = [], wishlist = [], onCancelBooking, onCancelRequest, onRemoveFromWishlist, user }) {
  const navigate = useNavigate();

  // Mock data for upcoming bookings
  const upcomingBookings = [];

  const handleExperienceClick = (experienceId) => {
    navigate(`/experience/${experienceId}`);
  };

  return (
    <main style={{ padding: "20px 0 60px" }}>
      {/* Saved for later */}
      <section style={{ marginBottom: 60 }}>
        <h3 style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: 400,
          letterSpacing: 0.8,
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 10
        }}>
          Saved for Later
          {wishlist.length > 0 && (
            <span style={{
              fontSize: 13,
              fontWeight: 400,
              opacity: 0.6,
              marginLeft: 8
            }}>
              ({wishlist.length})
            </span>
          )}
        </h3>

        {wishlist.length === 0 ? (
          <div style={{
            padding: "60px 20px",
            textAlign: "center",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)"
          }}>
            <p style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 15,
              marginBottom: 20,
              margin: 0
            }}>
              You haven't saved any experiences yet.
            </p>
            <Link
              to="/"
              style={{
                display: "inline-block",
                padding: "12px 28px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: 13,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 180ms ease",
                marginTop: 20
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
            >
              Explore Experiences
            </Link>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24
          }}>
            {wishlist.map((exp) => (
              <article
                key={exp.id}
                style={{
                  borderRadius: 18,
                  overflow: "hidden",
                  background: "rgba(255, 255, 255, 0.035)",
                  border: "1px solid rgba(255, 255, 255, 0.07)",
                  position: "relative",
                  transition: "transform 180ms ease, box-shadow 180ms ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  onClick={() => handleExperienceClick(exp.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div style={{
                    height: 200,
                    width: "100%",
                    overflow: "hidden",
                    background: "#000"
                  }}>
                    <img
                      src={exp.image}
                      alt={exp.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block"
                      }}
                      loading="lazy"
                    />
                  </div>

                  <div style={{ padding: "20px" }}>
                    <div style={{
                      fontSize: 11,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      opacity: 0.6,
                      marginBottom: 8
                    }}>
                      {exp.category}
                    </div>

                    <h4 style={{
                      fontSize: 16,
                      fontWeight: 400,
                      letterSpacing: 0.2,
                      margin: "0 0 10px 0",
                      lineHeight: 1.3,
                      color: "#fff"
                    }}>
                      {exp.title}
                    </h4>

                    <div style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.85)"
                    }}>
                      €{exp.price}
                    </div>
                  </div>
                </div>

                {/* Remove from wishlist button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromWishlist(exp);
                  }}
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 40,
                    height: 40,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    transition: "all 180ms ease",
                    color: "#dc2626"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  ♥
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Pending requests */}
      <section style={{ marginBottom: 60 }}>
        <h3 style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: 400,
          letterSpacing: 0.8,
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 10
        }}>
          Pending Requests
          {bookingRequests.length > 0 && (
            <span style={{
              fontSize: 13,
              fontWeight: 400,
              opacity: 0.6,
              marginLeft: 8
            }}>
              ({bookingRequests.length})
            </span>
          )}
        </h3>

        {bookingRequests.length === 0 ? (
          <div style={{
            padding: "60px 20px",
            textAlign: "center",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)"
          }}>
            <p style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 15,
              margin: 0
            }}>
              No pending booking requests.
            </p>
            <Link
              to="/"
              style={{
                display: "inline-block",
                padding: "12px 28px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: 13,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 180ms ease",
                marginTop: 20
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
            >
              Browse Experiences
            </Link>
          </div>
        ) : (
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 20
          }}>
            {bookingRequests.map((request) => (
              <div
                key={request.id}
                style={{
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                  padding: 24,
                  display: "grid",
                  gridTemplateColumns: "200px 1fr auto",
                  gap: 24,
                  alignItems: "center",
                  transition: "all 180ms ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                {/* Experience image */}
                <div
                  onClick={() => handleExperienceClick(request.experience.id)}
                  style={{
                    height: 140,
                    borderRadius: 12,
                    overflow: "hidden",
                    cursor: "pointer"
                  }}
                >
                  <img
                    src={request.experience.image}
                    alt={request.experience.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block"
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Request details */}
                <div>
                  <div style={{
                    fontSize: 11,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: 6
                  }}>
                    {request.experience.category}
                  </div>
                  <h4
                    onClick={() => handleExperienceClick(request.experience.id)}
                    style={{
                      fontSize: 18,
                      fontWeight: 400,
                      letterSpacing: 0.3,
                      margin: "0 0 12px 0",
                      color: "#fff",
                      cursor: "pointer",
                      transition: "color 180ms ease"
                    }}
                    onMouseEnter={(e) => e.target.style.color = "rgba(255,255,255,0.7)"}
                    onMouseLeave={(e) => e.target.style.color = "#fff"}
                  >
                    {request.experience.title}
                  </h4>
                  <div style={{ display: "flex", gap: 24, marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
                        Requested Date
                      </div>
                      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
                        {new Date(request.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
                        Status
                      </div>
                      <div style={{ 
                        fontSize: 12, 
                        color: "#f59e0b",
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        fontWeight: 500
                      }}>
                        Pending Response
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>
                    Submitted {new Date(request.submittedAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                {/* Cancel button */}
                <button
                  onClick={() => onCancelRequest(request.id)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "transparent",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 12,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 180ms ease",
                    whiteSpace: "nowrap"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "rgba(239,68,68,0.5)";
                    e.target.style.color = "#ef4444";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.15)";
                    e.target.style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  Cancel Request
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Upcoming experiences - login required */}
      <section>
        <h3 style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: 400,
          letterSpacing: 0.8,
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 10
        }}>
          Upcoming Experiences
          {upcomingBookings.length > 0 && (
            <span style={{
              fontSize: 13,
              fontWeight: 400,
              opacity: 0.6,
              marginLeft: 8
            }}>
              ({upcomingBookings.length})
            </span>
          )}
        </h3>

        {!user ? (
          <div style={{
            padding: "60px 20px",
            textAlign: "center",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)"
          }}>
            <p style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 15,
              marginBottom: 24,
              margin: "0 0 24px 0"
            }}>
              Sign in to view your upcoming experiences
            </p>
            <button
              onClick={() => window.scrollTo(0, 0)}
              style={{
                padding: "12px 28px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: 13,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 180ms ease",
                fontFamily: "inherit"
              }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.15)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
            >
              Login
            </button>
          </div>
        ) : upcomingBookings.length === 0 ? (
          <div style={{
            padding: "60px 20px",
            textAlign: "center",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)"
          }}>
            <p style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 15,
              margin: 0
            }}>
              No upcoming experiences scheduled.
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24
          }}>
            {/* Upcoming bookings will be mapped here */}
          </div>
        )}
      </section>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns: 200px 1fr auto"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

export default BookingsView;
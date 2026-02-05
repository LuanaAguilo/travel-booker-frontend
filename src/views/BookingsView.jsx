import { useNavigate, Link } from "react-router-dom";

function BookingsView({ bookings = [], wishlist = [], onCancelBooking, onRemoveFromWishlist }) {
  const navigate = useNavigate();

  // Mock data for upcoming and past bookings (you'll replace this with real data later)
  const upcomingBookings = [];
  const pastBookings = [];

  const handleExperienceClick = (experienceId) => {
    navigate(`/experience/${experienceId}`);
  };

  return (
    <main style={{ padding: "20px 0 60px" }}>
      {/* Saved for Later (Wishlist) */}
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

                {/* Remove from Wishlist Button */}
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

      {/* Upcoming Experiences */}
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

        {upcomingBookings.length === 0 ? (
          <div style={{
            padding: "60px 20px",
            textAlign: "center",
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
            <Link
              to="/"
              style={{
                display: "inline-block",
                padding: "12px 28px",
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
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24
          }}>
            {bookings.map((exp) => (
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
                      color: "#181818"
                    }}>
                      {exp.title}
                    </h4>

                    {/* FECHA DE RESERVA */}
                    {exp.bookingDate && (
                      <div style={{
                        display: "inline-block",
                        marginTop: "8px",
                        padding: "6px 12px",
                        background: "rgba(123, 30, 58, 0.08)",
                        border: "1px solid var(--color-primary)",
                        borderRadius: "6px",
                        color: "var(--color-primary)",
                        fontSize: "13px",
                        fontWeight: "600"
                      }}>
                        📅 Booked for: {new Date(exp.bookingDate).toLocaleDateString(undefined, {
                          weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'
                        })}
                      </div>
                    )}

                    <div style={{
                      fontSize: 14,
                      color: "rgba(24,24,24,0.85)"
                    }}>
                      €{exp.price}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Past Experiences */}
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
          Past Experiences
          {pastBookings.length > 0 && (
            <span style={{
              fontSize: 13,
              fontWeight: 400,
              opacity: 0.6,
              marginLeft: 8
            }}>
              ({pastBookings.length})
            </span>
          )}
        </h3>

        {pastBookings.length === 0 ? (
          <div style={{
            padding: "60px 20px",
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)"
          }}>
            <p style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 15,
              margin: 0
            }}>
              No past experiences yet.
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24
          }}>
            {/* Past bookings will be mapped here */}
          </div>
        )}
      </section>
    </main>
  );
}

export default BookingsView;
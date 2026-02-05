import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getExperiences } from "../services/api";
import BookingModal from "../components/BookingModal";
import BookingRequestForm from "../components/BookingRequestForm";

function ExperienceDetailView({ onAddToWishlist, wishlist = [], onAddBookingRequest }) {
  const { experienceId } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const isInWishlist = wishlist.some(item => item.id === parseInt(experienceId));

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setErrorMsg("");

        const data = await getExperiences();

        if (!mounted) return;

        const found = Array.isArray(data) 
          ? data.find(exp => exp.id === parseInt(experienceId))
          : null;

        if (found) {
          setExperience(found);
        } else {
          setErrorMsg("Experience not found.");
        }
      } catch (err) {
        if (!mounted) return;

        const status = err?.response?.status;
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unknown error while fetching experience.";

        setErrorMsg(status ? `Error ${status}: ${message}` : message);
        setExperience(null);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [experienceId]);

  const handleWishlistToggle = () => {
    if (experience) {
      onAddToWishlist(experience);
    }
  };

  const handleRequestToBook = () => {
    setShowCalendarModal(true);
  };

  const handleContinueFromCalendar = (date) => {
    setSelectedDate(date);
    setShowCalendarModal(false);
    setShowBookingForm(true);
  };

  const handleCancelCalendar = () => {
    setShowCalendarModal(false);
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
    setSelectedDate("");
  };

  const handleSubmitBookingRequest = (requestData) => {
    onAddBookingRequest(requestData);
  };

  if (loading) {
    return (
      <main style={{ padding: "40px 0" }}>
        <p style={{ textAlign: "center", opacity: 0.85, color: "rgba(255,255,255,0.88)" }}>
          Loading experience…
        </p>
      </main>
    );
  }

  if (errorMsg || !experience) {
    return (
      <main style={{ padding: "40px 0" }}>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.88)" }}>
          {errorMsg || "Experience not found."}
        </p>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link to="/" style={{ color: "rgba(255,255,255,0.88)", textDecoration: "underline" }}>
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: "20px 0 60px" }}>
      {/* Back Navigation */}
      <div style={{ marginBottom: 30, maxWidth: 900, margin: "0 auto 30px" }}>
        <Link 
          to={`/category/${encodeURIComponent(experience.category)}`}
          style={{ 
            color: "rgba(255,255,255,0.7)", 
            textDecoration: "none",
            fontSize: 14,
            letterSpacing: 1,
            textTransform: "uppercase",
            transition: "all 180ms ease"
          }}
          onMouseEnter={(e) => e.target.style.color = "#fff"}
          onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.7)"}
        >
          ← Back to {experience.category}
        </Link>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Hero Image */}
        <div style={{
          height: 320,
          width: "100%",
          borderRadius: 24,
          overflow: "hidden",
          marginBottom: 40,
          position: "relative"
        }}>
          <img
            src={experience.image}
            alt={experience.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block"
            }}
          />
          
          {/* Wishlist Heart Button */}
          <button
            onClick={handleWishlistToggle}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 50,
              height: 50,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.3)",
              background: isInWishlist ? "rgba(220,38,38,0.9)" : "rgba(0,0,0,0.5)",
              backdropFilter: "blur(10px)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              transition: "all 200ms ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.background = isInWishlist ? "rgba(220,38,38,1)" : "rgba(0,0,0,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = isInWishlist ? "rgba(220,38,38,0.9)" : "rgba(0,0,0,0.5)";
            }}
          >
            {isInWishlist ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 40 }}>
          {/* Left Column: Details */}
          <div>
            <div style={{ marginBottom: 10 }}>
              <span style={{
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)"
              }}>
                {experience.category}
              </span>
            </div>

            <h1 style={{
              fontSize: "2rem",
              fontWeight: 300,
              letterSpacing: 0.8,
              margin: "0 0 20px 0",
              color: "#fff",
              lineHeight: 1.2
            }}>
              {experience.title}
            </h1>

            <div style={{
              display: "flex",
              gap: 28,
              marginBottom: 28,
              paddingBottom: 28,
              borderBottom: "1px solid rgba(255,255,255,0.1)"
            }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.6, marginBottom: 5 }}>
                  Duration
                </div>
                <div style={{ fontSize: 14, color: "#fff" }}>{experience.duration}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.6, marginBottom: 5 }}>
                  Group Size
                </div>
                <div style={{ fontSize: 14, color: "#fff" }}>{experience.groupSize}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.6, marginBottom: 5 }}>
                  Languages
                </div>
                <div style={{ fontSize: 14, color: "#fff" }}>{experience.languages?.join(", ")}</div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 18, fontWeight: 400, letterSpacing: 0.5, marginBottom: 14, color: "#fff" }}>
                Overview
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.85)", margin: 0 }}>
                {experience.description}
              </p>
            </div>

            {/* Detailed Itinerary */}
            {experience.detailedItinerary && experience.detailedItinerary.length > 0 && (
              <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 18, fontWeight: 400, letterSpacing: 0.5, marginBottom: 20, color: "#fff" }}>
                  Itinerary
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {experience.detailedItinerary.map((item, index) => (
                    <div key={index} style={{
                      paddingLeft: 20,
                      borderLeft: "2px solid rgba(255,255,255,0.15)"
                    }}>
                      <div style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 5 }}>
                        {item.time}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 400, marginBottom: 7, color: "#fff" }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.75)" }}>
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included */}
            {experience.included && experience.included.length > 0 && (
              <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 18, fontWeight: 400, letterSpacing: 0.5, marginBottom: 14, color: "#fff" }}>
                  What's Included
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
                  {experience.included.map((item, index) => (
                    <li key={index} style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ color: "#10b981", fontSize: 15 }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What's NOT Included */}
            {experience.notIncluded && experience.notIncluded.length > 0 && (
              <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 18, fontWeight: 400, letterSpacing: 0.5, marginBottom: 14, color: "#fff" }}>
                  What's Not Included
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
                  {experience.notIncluded.map((item, index) => (
                    <li key={index} style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ opacity: 0.5, fontSize: 15 }}>✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Special Features */}
            {experience.specialFeatures && experience.specialFeatures.length > 0 && (
              <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 18, fontWeight: 400, letterSpacing: 0.5, marginBottom: 14, color: "#fff" }}>
                  What Makes This Special
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
                  {experience.specialFeatures.map((item, index) => (
                    <li key={index} style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ fontSize: 15 }}>✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Booking Details */}
            {experience.bookingDetails && (
              <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 18, fontWeight: 400, letterSpacing: 0.5, marginBottom: 14, color: "#fff" }}>
                  Know Before You Book
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {experience.bookingDetails.advanceNotice && (
                    <div>
                      <span style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Advance Notice: </span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{experience.bookingDetails.advanceNotice}</span>
                    </div>
                  )}
                  {experience.bookingDetails.cancellationPolicy && (
                    <div>
                      <span style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Cancellation: </span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{experience.bookingDetails.cancellationPolicy}</span>
                    </div>
                  )}
                  {experience.bookingDetails.dresscode && (
                    <div>
                      <span style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Dress Code: </span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{experience.bookingDetails.dresscode}</span>
                    </div>
                  )}
                  {experience.bookingDetails.accessibility && (
                    <div>
                      <span style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Accessibility: </span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{experience.bookingDetails.accessibility}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Booking Card */}
          <div>
            <div style={{
              position: "sticky",
              top: 100,
              padding: 28,
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
            }}>
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.6, marginBottom: 7 }}>
                  Price
                </div>
                <div style={{ fontSize: 32, fontWeight: 300, color: "#fff", letterSpacing: -0.5 }}>
                  €{experience.price}
                </div>
                <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>
                  per person
                </div>
              </div>

              <button
                onClick={handleRequestToBook}
                style={{
                  width: "100%",
                  padding: "14px 22px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: 12,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 200ms ease",
                  marginBottom: 12
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Request to Book
              </button>

              <button
                onClick={handleWishlistToggle}
                style={{
                  width: "100%",
                  padding: "14px 22px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 12,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 200ms ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                {isInWishlist ? "❤️ Saved" : "🤍 Save for Later"}
              </button>

              <div style={{
                marginTop: 22,
                paddingTop: 22,
                borderTop: "1px solid rgba(255,255,255,0.1)",
                fontSize: 12,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.7)"
              }}>
                This experience requires consultation. We'll respond within an hour during business hours to discuss availability, preferences, and finalize details.
              </div>

              {experience.meetingPoint && experience.meetingPoint !== "N/A - reservation service" && (
                <div style={{ marginTop: 18 }}>
                  <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 7 }}>
                    Meeting Point
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>
                    {experience.meetingPoint}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Modal */}
      {showCalendarModal && (
        <BookingModal 
          experience={experience}
          onContinue={handleContinueFromCalendar}
          onCancel={handleCancelCalendar}
        />
      )}

      {/* Booking Request Form */}
      {showBookingForm && (
        <BookingRequestForm 
          experience={experience}
          selectedDate={selectedDate}
          onClose={handleCloseBookingForm}
          onSubmitRequest={handleSubmitBookingRequest}
        />
      )}

      {/* Mobile Responsive */}
      <style>{`
        @media (max-width: 1024px) {
          div[style*="gridTemplateColumns: 1fr 340px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

export default ExperienceDetailView;
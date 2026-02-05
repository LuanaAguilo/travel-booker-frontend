import React, { useState } from "react";

export default function BookingRequestForm({ experience, selectedDate, onClose, onSubmitRequest }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Send booking request to parent
      onSubmitRequest({
        experience: experience,
        date: selectedDate,
        contactInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        message: formData.message,
      });

      setIsSubmitting(false);
      setShowSuccess(true);

      // Close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 1000);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.08)",
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
    color: "rgba(255,255,255,0.7)",
    marginBottom: 8,
    textAlign: "left",
  };

  if (showSuccess) {
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(12px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}>
        <div style={{
          background: "rgba(20, 20, 22, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: 20,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
          padding: "60px 40px",
          maxWidth: "500px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>✓</div>
          <h2 style={{
            color: "#fff",
            fontSize: "1.5rem",
            fontWeight: 300,
            letterSpacing: 0.5,
            marginBottom: 16,
            marginTop: 0
          }}>
            Thank you for your booking request!
          </h2>
          <p style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "0.95rem",
            margin: 0,
            lineHeight: 1.6
          }}>
            We'll respond within 1 hour during business hours to confirm availability and finalize details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.85)",
      backdropFilter: "blur(12px)",
      zIndex: 2000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      overflowY: "auto"
    }}>
      <div style={{
        background: "rgba(20, 20, 22, 0.95)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: 20,
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
        padding: "40px 36px 36px 36px",
        maxWidth: "550px",
        width: "100%",
        margin: "40px 0",
        position: "relative"
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "transparent",
            border: "none",
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: 28,
            cursor: "pointer",
            padding: 8,
            lineHeight: 1,
            transition: "all 180ms ease"
          }}
          onMouseEnter={(e) => e.target.style.color = "#fff"}
          onMouseLeave={(e) => e.target.style.color = "rgba(255, 255, 255, 0.6)"}
        >
          ×
        </button>

        <h2 style={{
          color: "#fff",
          fontSize: "1.5rem",
          fontWeight: 300,
          letterSpacing: 0.5,
          marginBottom: 8,
          marginTop: 0,
          textAlign: "center"
        }}>
          Request Booking
        </h2>

        <p style={{
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: "0.9rem",
          marginBottom: 32,
          marginTop: 0,
          textAlign: "center"
        }}>
          Complete your booking request
        </p>

        {/* Booking Details Summary */}
        <div style={{
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 12,
          padding: 20,
          marginBottom: 32
        }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
              Experience
            </div>
            <div style={{ color: "#fff", fontSize: 15 }}>
              {experience?.title}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
              Preferred Date
            </div>
            <div style={{ color: "#fff", fontSize: 15 }}>
              {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={labelStyle}>Name *</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              style={inputStyle}
              disabled={isSubmitting}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.4)";
                e.target.style.background = "rgba(255,255,255,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.2)";
                e.target.style.background = "rgba(255,255,255,0.08)";
              }}
            />
          </div>

          <div>
            <label style={labelStyle}>Email *</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              style={inputStyle}
              disabled={isSubmitting}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.4)";
                e.target.style.background = "rgba(255,255,255,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.2)";
                e.target.style.background = "rgba(255,255,255,0.08)";
              }}
            />
          </div>

          <div>
            <label style={labelStyle}>Phone *</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
              style={inputStyle}
              disabled={isSubmitting}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.4)";
                e.target.style.background = "rgba(255,255,255,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.2)";
                e.target.style.background = "rgba(255,255,255,0.08)";
              }}
            />
          </div>

          <div>
            <label style={labelStyle}>Additional Notes</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              rows={4} 
              placeholder="Optional: Any special requests or questions..."
              style={{ 
                ...inputStyle, 
                resize: "vertical", 
                minHeight: 100,
                fontFamily: "inherit"
              }}
              disabled={isSubmitting}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.4)";
                e.target.style.background = "rgba(255,255,255,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.2)";
                e.target.style.background = "rgba(255,255,255,0.08)";
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} 
            style={{ 
              padding: "16px 28px", 
              borderRadius: 999, 
              border: "1px solid rgba(255,255,255,0.18)", 
              background: isSubmitting ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.1)", 
              color: "#fff", 
              fontSize: 13, 
              letterSpacing: 2, 
              textTransform: "uppercase", 
              fontWeight: 500, 
              cursor: isSubmitting ? "not-allowed" : "pointer", 
              transition: "all 180ms ease", 
              marginTop: 12 
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) e.target.style.background = "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) e.target.style.background = "rgba(255,255,255,0.1)";
            }}
          >
            {isSubmitting ? "Sending..." : "Send Booking Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
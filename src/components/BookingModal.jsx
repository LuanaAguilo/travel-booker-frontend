import React, { useState } from "react";

export default function BookingModal({ experience, onContinue, onCancel }) {
  const [date, setDate] = useState("");

  const handleContinue = () => {
    if (date) {
      onContinue(date);
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.7)",
      backdropFilter: "blur(8px)",
      zIndex: 1000,
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
        padding: "40px 32px 32px 32px",
        minWidth: "320px",
        maxWidth: "95vw",
        width: "100%",
        maxWidth: "420px",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch"
      }}>
        <h2 style={{
          color: "#fff",
          fontSize: "1.35rem",
          fontWeight: 300,
          letterSpacing: 0.5,
          marginBottom: 8,
          marginTop: 0,
          textAlign: "center",
          lineHeight: 1.3
        }}>
          Select a Date
        </h2>
        
        <p style={{
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: "0.95rem",
          marginBottom: 28,
          marginTop: 0,
          textAlign: "center",
          letterSpacing: 0.3
        }}>
          {experience?.title}
        </p>

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          style={{
            padding: "14px 16px",
            borderRadius: 10,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            fontSize: "1rem",
            marginBottom: 32,
            background: "rgba(255, 255, 255, 0.05)",
            color: "#fff",
            outline: "none",
            transition: "all 0.2s",
            fontFamily: "inherit"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
            e.target.style.background = "rgba(255, 255, 255, 0.08)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
            e.target.style.background = "rgba(255, 255, 255, 0.05)";
          }}
        />

        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12
        }}>
          <button
            onClick={onCancel}
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: "0.9rem",
              fontWeight: 500,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              padding: "12px 24px",
              borderRadius: 999,
              cursor: "pointer",
              transition: "all 0.18s",
              fontFamily: "inherit"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.05)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleContinue}
            disabled={!date}
            style={{
              background: date ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: date ? "#fff" : "rgba(255, 255, 255, 0.4)",
              fontSize: "0.9rem",
              fontWeight: 500,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              padding: "12px 28px",
              borderRadius: 999,
              cursor: date ? "pointer" : "not-allowed",
              transition: "all 0.18s",
              fontFamily: "inherit"
            }}
            onMouseEnter={(e) => {
              if (date) {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (date) {
                e.target.style.background = "rgba(255, 255, 255, 0.15)";
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
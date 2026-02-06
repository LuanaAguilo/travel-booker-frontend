import React, { useState } from "react";

export default function LoginModal({ onClose, onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - just pass the name/email to parent
    onLogin({
      name: formData.name || formData.email.split('@')[0],
      email: formData.email
    });
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
        padding: "40px 36px 36px 36px",
        maxWidth: "440px",
        width: "100%",
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
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        <p style={{
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: "0.9rem",
          marginBottom: 32,
          marginTop: 0,
          textAlign: "center"
        }}>
          {isSignUp ? "Sign up to manage your experiences" : "Sign in to your account"}
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {isSignUp && (
            <div>
              <label style={labelStyle}>Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required={isSignUp}
                style={inputStyle}
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
          )}

          <div>
            <label style={labelStyle}>Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              style={inputStyle}
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
            <label style={labelStyle}>Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              style={inputStyle}
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
            style={{ 
              padding: "16px 28px", 
              borderRadius: 999, 
              border: "1px solid rgba(255,255,255,0.18)", 
              background: "rgba(255,255,255,0.1)", 
              color: "#fff", 
              fontSize: 13, 
              letterSpacing: 2, 
              textTransform: "uppercase", 
              fontWeight: 500, 
              cursor: "pointer", 
              transition: "all 180ms ease", 
              marginTop: 12 
            }}
            onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.15)"}
            onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div style={{
          marginTop: 24,
          textAlign: "center",
          fontSize: 13,
          color: "rgba(255,255,255,0.6)"
        }}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: 13,
              fontFamily: "inherit",
              padding: 0
            }}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
import { Link, Routes, Route, useLocation } from "react-router-dom";
import "./theme.css";
import HomeView from "./views/HomeView";
import CatalogView from "./views/CatalogView";

function BookingsPage() {
  return <h2 style={{ color: "var(--color-text-light)" }}>My Bookings</h2>;
}
function ProfilePage() {
  return <h2 style={{ color: "var(--color-text-light)" }}>Profile</h2>;
}

export default function App() {
  const location = useLocation();

  const linkBase = {
    color: "#f2f2f2",
    fontWeight: 500,
    textDecoration: "none",
    letterSpacing: 0.3,
    padding: "8px 10px",
    borderRadius: 999,
    transition: "all 160ms ease",
  };

  const activeLink = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
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
          background: "rgba(14,14,16,0.96)",
          borderBottom: "1px solid #232328",
          padding: "18px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: "1.9rem",
            fontWeight: 500,
            letterSpacing: 1,
          }}
        >
          Select Madrid
        </h1>

        <nav style={{ display: "flex", gap: 16, marginTop: 14 }}>
          <Link style={navLinkStyle("/")} to="/">Home</Link>
          <Link style={navLinkStyle("/catalog")} to="/catalog">Catalog</Link>
          <Link style={navLinkStyle("/bookings")} to="/bookings">My Bookings</Link>
          <Link style={navLinkStyle("/profile")} to="/profile">Profile</Link>
        </nav>
      </header>

      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "1200px",
          margin: "30px auto",
          padding: "0 12px",
        }}
      >
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/catalog" element={<CatalogView />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}

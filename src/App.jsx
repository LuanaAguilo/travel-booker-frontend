
import { Link, Routes, Route } from "react-router-dom";
import "./theme.css";
import HomeView from "./views/HomeView";
import CatalogView from "./views/CatalogView";
// Placeholders for future views
function BookingsPage() {
  return <h2>My Bookings</h2>;
}
function ProfilePage() {
  return <h2>Profile</h2>;
}

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-black)',
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      maxWidth: '100vw',
      overflowX: 'hidden',
    }}>
      <header
        style={{
          width: '100%',
          minWidth: 0,
          background: 'var(--color-header)',
          boxShadow: '0 2px 8px rgba(30,30,30,0.04)',
          padding: '0 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <h1
          style={{
            margin: 0,
            color: 'var(--color-accent)',
            fontSize: '2.2rem',
            letterSpacing: -2,
            whiteSpace: 'nowrap',
            minWidth: 0,
            textAlign: 'center',
            fontWeight: 800,
            textShadow: '0 1px 2px rgba(30,30,30,0.10)'
          }}
        >
          MadVentures
        </h1>
        <nav
          style={{
            display: 'flex',
            gap: 18,
            fontSize: '1.1rem',
            flexWrap: 'wrap',
            minWidth: 0,
            justifyContent: 'center',
            width: '100%',
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          <Link style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }} to="/">Home</Link>
          <Link style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }} to="/catalog">Catalog</Link>
          <Link style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }} to="/bookings">My Bookings</Link>
          <Link style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }} to="/profile">Profile</Link>
        </nav>
      </header>
      <main style={{
        flex: 1,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 8px 0 8px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowX: 'hidden',
        background: 'rgba(24,24,24,0.98)',
        borderRadius: '1.5rem',
        boxShadow: '0 4px 32px rgba(123,30,58,0.10)',
      }}>
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

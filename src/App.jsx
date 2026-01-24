import { Link, Routes, Route } from "react-router-dom";

function ExplorePage() {
  return <h2>Explore</h2>;
}

function BookingsPage() {
  return <h2>My Bookings</h2>;
}

function ProfilePage() {
  return <h2>Profile</h2>;
}

export default function App() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ margin: 0 }}>Travel Booker</h1>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link to="/">Explore</Link>
          <Link to="/bookings">My Bookings</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>

      <main style={{ marginTop: 24 }}>
        <Routes>
          <Route path="/" element={<ExplorePage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}

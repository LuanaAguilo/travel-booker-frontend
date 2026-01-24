import { Link, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExperiences } from "./services/api";

function ExplorePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setError("");
        setLoading(true);
        const data = await getExperiences();
        setExperiences(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;

  return (
    <div>
      <h2>Explore</h2>
      {experiences.length === 0 ? (
        <p>No experiences yet.</p>
      ) : (
        <ul>
          {experiences.map((e) => (
            <li key={e.id}>
              <strong>{e.title}</strong> — {e.city} — {new Date(e.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
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

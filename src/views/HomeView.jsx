import { useEffect, useState } from "react";
import { getExperiences } from "../services/api";
import ExperienceGrid from "../components/ExperienceGrid";
import "./HomeView.css";

export default function HomeView() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getExperiences()
      .then((data) => setExperiences(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <section style={{ width: "100%" }}>
        <h2
          style={{
            color: "var(--text-main)",
            margin: "0 0 14px",
            fontSize: "1.4rem",
            letterSpacing: -0.3,
          }}
        >
          Featured Experiences
        </h2>

        {loading ? (
          <p style={{ color: "var(--text-soft)" }}>Loading…</p>
        ) : error ? (
          <p style={{ color: "crimson" }}>{error}</p>
        ) : (
          <div className="featured-horizontal">
            <ExperienceGrid experiences={experiences.slice(0, 8)} />
          </div>
        )}
      </section>
    </div>
  );
}

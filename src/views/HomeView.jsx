import { useEffect, useState } from "react";
import { getExperiences } from "../services/api";
import ExperienceGrid from "../components/ExperienceGrid";

function HomeView() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setErrorMsg("");

        const data = await getExperiences();

        if (!mounted) return;

        // Ensure we always store an array
        setExperiences(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!mounted) return;

        // Show a readable error on screen
        const status = err?.response?.status;
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unknown error while fetching experiences.";

        setErrorMsg(status ? `Error ${status}: ${message}` : message);
        setExperiences([]);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  // IMPORTANT: Do NOT render a big page title here (Navbar handles the branding)
  // That avoids the “old title + new title” problem.
  if (loading) {
    return (
      <main style={{ padding: "40px 0" }}>
        <p style={{ textAlign: "center", opacity: 0.85 }}>Loading experiences…</p>
      </main>
    );
  }

  if (errorMsg) {
    return (
      <main style={{ padding: "40px 0" }}>
        <p style={{ textAlign: "center" }}>Could not load experiences.</p>
        <p style={{ textAlign: "center", opacity: 0.8 }}>{errorMsg}</p>
      </main>
    );
  }

  if (experiences.length === 0) {
    return (
      <main style={{ padding: "40px 0" }}>
        <p style={{ textAlign: "center", opacity: 0.85 }}>No experiences found.</p>
      </main>
    );
  }

  return (
    <main>
      <ExperienceGrid experiences={experiences} />
    </main>
  );
}

export default HomeView;

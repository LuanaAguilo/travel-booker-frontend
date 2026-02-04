import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getExperiences } from "../services/api";

function CategoryView() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const decodedCategory = decodeURIComponent(categoryName);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setErrorMsg("");

        const data = await getExperiences();

        if (!mounted) return;

        const filtered = Array.isArray(data) 
          ? data.filter(exp => exp.category === decodedCategory)
          : [];

        setExperiences(filtered);
      } catch (err) {
        if (!mounted) return;

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
  }, [decodedCategory]);

  const handleExperienceClick = (experienceId) => {
    navigate(`/experience/${experienceId}`);
  };

  if (loading) {
    return (
      <main style={{ padding: "40px 0" }}>
        <p style={{ textAlign: "center", opacity: 0.85, color: "rgba(255,255,255,0.88)" }}>
          Loading experiences…
        </p>
      </main>
    );
  }

  if (errorMsg) {
    return (
      <main style={{ padding: "40px 0" }}>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.88)" }}>
          Could not load experiences.
        </p>
        <p style={{ textAlign: "center", opacity: 0.8, color: "rgba(255,255,255,0.88)" }}>
          {errorMsg}
        </p>
      </main>
    );
  }

  if (experiences.length === 0) {
    return (
      <main style={{ padding: "40px 0" }}>
        <h2 style={{ 
          color: "#fff", 
          fontWeight: 300, 
          letterSpacing: 1.4, 
          marginBottom: 20,
          textAlign: "center"
        }}>
          {decodedCategory}
        </h2>
        <p style={{ textAlign: "center", opacity: 0.85, color: "rgba(255,255,255,0.88)" }}>
          No experiences found in this category.
        </p>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link 
            to="/" 
            style={{ 
              color: "rgba(255,255,255,0.88)", 
              textDecoration: "underline" 
            }}
          >
            ← Back to Categories
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: "20px 0 40px" }}>
      <div style={{ marginBottom: 30, display: "flex", alignItems: "center", gap: 20 }}>
        <Link 
          to="/" 
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
          ← All Categories
        </Link>
      </div>

      <h2 style={{ 
        color: "#fff", 
        fontSize: "2rem",
        fontWeight: 300, 
        letterSpacing: 1.4, 
        marginBottom: 10,
        marginTop: 0
      }}>
        {decodedCategory}
      </h2>
      
      <p style={{ 
        color: "rgba(255,255,255,0.7)", 
        marginBottom: 40,
        fontSize: 14
      }}>
        {experiences.length} {experiences.length === 1 ? 'experience' : 'experiences'}
      </p>

      {/* 2-column grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 32,
        maxWidth: 1200,
        margin: "0 auto"
      }}>
        {experiences.map((exp) => (
          <article
            key={exp.id}
            onClick={() => handleExperienceClick(exp.id)}
            style={{
              borderRadius: 20,
              overflow: "hidden",
              background: "rgba(255, 255, 255, 0.035)",
              border: "1px solid rgba(255, 255, 255, 0.07)",
              cursor: "pointer",
              transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
              e.currentTarget.style.boxShadow = "0 14px 50px rgba(0, 0, 0, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{
              height: 280,
              width: "100%",
              overflow: "hidden",
              background: "#000"
            }}>
              <img
                src={exp.image}
                alt={exp.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block"
                }}
                loading="lazy"
              />
            </div>

            <div style={{
              padding: "24px 24px 22px",
              color: "rgba(255, 255, 255, 0.92)"
            }}>
              <div style={{
                fontSize: 11,
                letterSpacing: 2.2,
                textTransform: "uppercase",
                opacity: 0.65,
                marginBottom: 10
              }}>
                {exp.category}
              </div>

              <h3 style={{
                fontSize: 18,
                fontWeight: 400,
                letterSpacing: 0.2,
                margin: "0 0 12px 0",
                lineHeight: 1.3
              }}>
                {exp.title}
              </h3>

              <div style={{
                fontSize: 14,
                opacity: 0.85,
                letterSpacing: 0.2
              }}>
                €{exp.price}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Mobile: 1 column */}
      <style>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns: repeat(2, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

export default CategoryView;
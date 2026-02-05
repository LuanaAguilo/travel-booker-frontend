import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExperiences } from "../services/api";

function HomeView() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setErrorMsg("");

        const data = await getExperiences();

        if (!mounted) return;

        // Group experiences by category and get the first image from each
        const categoryMap = {};
        
        if (Array.isArray(data)) {
          data.forEach(exp => {
            if (exp.category && !categoryMap[exp.category]) {
              categoryMap[exp.category] = {
                name: exp.category,
                image: exp.image,
                count: 0
              };
            }
            if (exp.category) {
              categoryMap[exp.category].count++;
            }
          });
        }

        // Convert to array and sort by category name
        const categoryArray = Object.values(categoryMap).sort((a, b) => 
          a.name.localeCompare(b.name)
        );

        setCategories(categoryArray);
      } catch (err) {
        if (!mounted) return;

        const status = err?.response?.status;
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unknown error while fetching experiences.";

        setErrorMsg(status ? `Error ${status}: ${message}` : message);
        setCategories([]);
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

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  if (loading) {
    return (
      <main style={{ padding: "40px 0" }}>
        <p style={{ textAlign: "center", opacity: 0.85, color: "rgba(255,255,255,0.88)" }}>
          Loading categories…
        </p>
      </main>
    );
  }

  if (errorMsg) {
    return (
      <main style={{ padding: "40px 0" }}>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.88)" }}>
          Could not load categories.
        </p>
        <p style={{ textAlign: "center", opacity: 0.8, color: "rgba(255,255,255,0.88)" }}>
          {errorMsg}
        </p>
      </main>
    );
  }

  if (categories.length === 0) {
    return (
      <main style={{ padding: "40px 0" }}>
        <p style={{ textAlign: "center", opacity: 0.85, color: "rgba(255,255,255,0.88)" }}>
          No categories found.
        </p>
      </main>
    );
  }

  return (
    <main style={{ padding: "20px 0 40px" }}>
      
      
      <p style={{ 
        color: "rgba(255,255,255,0.7)", 
        marginBottom: 0,
        textAlign: "center",
        fontSize: 14,
        maxWidth: 600,
        margin: "0 auto 0px"
      }}>
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 28,
        maxWidth: 1100,
        margin: "0 auto"
      }}>
        {categories.map((category) => (
          <article
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
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
              height: 240,
              width: "100%",
              overflow: "hidden",
              background: "#000"
            }}>
              <img
                src={category.image}
                alt={category.name}
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
              <h3 style={{
                fontSize: 20,
                fontWeight: 400,
                letterSpacing: 0.4,
                margin: "0 0 10px 0",
                lineHeight: 1.3,
                color: "#fff"
              }}>
                {category.name}
              </h3>

              <p style={{
                fontSize: 13,
                opacity: 0.7,
                letterSpacing: 0.3,
                margin: 0
              }}>
                {category.count} {category.count === 1 ? 'experience' : 'experiences'}
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default HomeView;
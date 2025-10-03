// src/pages/Store.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api";
import { FaBoxOpen } from "react-icons/fa";

export default function Store() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [cats, setCats] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    api.get("/categories").then((r) => setCats(r.data));
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (q.trim()) {
      navigate(`/buscar?search=${encodeURIComponent(q)}`);
    }
  };

  const isMobile = windowWidth <= 768;

  const styles = {
    body: {
      minHeight: "100vh",
      background: "#F8FAFC",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    header: {
      background: "#1B4B8C",
      color: "white",
      padding: isMobile ? "16px" : "24px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "12px",
      alignItems: "center",
      justifyContent: "space-between",
    },
    searchForm: {
      display: "flex",
      width: isMobile ? "100%" : "auto",
      flex: isMobile ? "none" : 1,
      maxWidth: isMobile ? "100%" : "400px",
      background: "white",
      borderRadius: "6px",
      overflow: "hidden",
    },
    searchInput: {
      flex: 1,
      padding: isMobile ? "8px 12px" : "10px 16px",
      border: "none",
      outline: "none",
      fontSize: isMobile ? "14px" : "16px",
      color: "#1F2937",
    },
    searchBtn: {
      padding: isMobile ? "8px 12px" : "10px 16px",
      background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
      color: "white",
      border: "none",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    backButton: {
      padding: isMobile ? "8px 16px" : "10px 20px",
      background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
      color: "white",
      textDecoration: "none",
      borderRadius: "6px",
      fontWeight: "600",
      textAlign: "center",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 4px rgba(37, 99, 235, 0.3)",
    },
    main: {
      flex: 1,
      padding: isMobile ? "16px" : "24px",
    },
    title: {
      fontSize: isMobile ? "24px" : "32px",
      fontWeight: "700",
      color: "#1F2937",
      textAlign: "center",
      marginBottom: "24px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(200px, 1fr))",
      gap: isMobile ? "16px" : "24px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    categoryCard: {
      background: "white",
      borderRadius: "12px",
      padding: isMobile ? "16px" : "24px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      textDecoration: "none",
      color: "inherit",
      transition: "all 0.3s ease",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    categoryIcon: {
      color: "#2563EB",
      fontSize: isMobile ? "24px" : "32px",
      marginBottom: "12px",
    },
    categoryName: {
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: "600",
      color: "#1F2937",
      marginBottom: "4px",
    },
    categoryStatus: {
      fontSize: isMobile ? "12px" : "14px",
      color: "#6B7280",
    },
    emptyState: {
      gridColumn: "1 / -1",
      textAlign: "center",
      color: "#6B7280",
      fontSize: "16px",
      padding: "40px 0",
    },
    footer: {
      background: "#1F2937",
      color: "rgba(255, 255, 255, 0.8)",
      textAlign: "center",
      padding: isMobile ? "12px" : "16px",
      fontSize: "14px",
      boxShadow: "0 -1px 3px rgba(0, 0, 0, 0.1)",
    },
  };

  const hoverEffects = {
    searchBtnHover: {
      transform: "translateY(-1px)",
      boxShadow: "0 4px 8px rgba(37, 99, 235, 0.4)",
    },
    backButtonHover: {
      transform: "translateY(-1px)",
      boxShadow: "0 4px 8px rgba(37, 99, 235, 0.4)",
    },
    categoryCardHover: {
      transform: "translateY(-4px)",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <div style={styles.body}>
      {/* Header con buscador */}
      <header style={styles.header}>
        {/* Formulario de búsqueda */}
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={styles.searchInput}
          />
          <button 
            type="submit" 
            style={styles.searchBtn}
            onMouseEnter={(e) => Object.assign(e.target.style, hoverEffects.searchBtnHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.searchBtn)}
          >
            🔍
          </button>
        </form>

        {/* Botón regresar */}
        <Link
          to="/"
          style={styles.backButton}
          onMouseEnter={(e) => Object.assign(e.target.style, hoverEffects.backButtonHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, styles.backButton)}
        >
          ← Regresar
        </Link>
      </header>

      {/* Contenido principal - Categorías */}
      <main style={styles.main}>
        <h1 style={styles.title}>Categorías Disponibles</h1>
        <div style={styles.grid}>
          {cats.length > 0 ? (
            cats.map((c) => (
              <Link
                key={c.id}
                to={`/categoria/${c.id}`}
                style={styles.categoryCard}
                onMouseEnter={(e) => Object.assign(e.target.style, hoverEffects.categoryCardHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.categoryCard)}
              >
                <FaBoxOpen style={styles.categoryIcon} />
                <h3 style={styles.categoryName}>{c.name}</h3>
                <p style={styles.categoryStatus}>
                  {c.active ? "Disponible" : "Próximamente"}
                </p>
              </Link>
            ))
          ) : (
            <div style={styles.emptyState}>
              No hay categorías disponibles.
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} LyRinnovatech · Orellana · Ecuador
      </footer>
    </div>
  );
}
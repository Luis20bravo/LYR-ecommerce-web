// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (q.trim()) {
      navigate(`/buscar?search=${encodeURIComponent(q)}`);
      setShowMobileMenu(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/acceso");
  };

  // Estilos responsivos basados en el ancho de la ventana
  const isMobile = windowWidth <= 768;

  const styles = {
    header: {
      background: "#1B4B8C",
      color: "white",
      padding: isMobile ? "12px 0" : "16px 0",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    headerContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isMobile ? "0 16px" : "0 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
    },
    logoSection: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      textDecoration: "none",
      color: "white",
    },
    logoImg: {
      width: isMobile ? "36px" : "48px",
      height: isMobile ? "36px" : "48px",
      objectFit: "contain",
      borderRadius: "6px",
      background: "rgba(255, 255, 255, 0.1)",
      padding: "4px",
    },
    companyName: { 
      fontSize: isMobile ? "18px" : "24px", 
      fontWeight: "700", 
      marginBottom: "2px" 
    },
    companyTagline: { 
      fontSize: isMobile ? "12px" : "14px", 
      opacity: 0.9,
      display: isMobile ? "none" : "block"
    },
    searchForm: {
      flex: 1,
      maxWidth: "400px",
      margin: "0 20px",
      display: isMobile ? "none" : "flex",
    },
    searchInput: {
      flex: 1,
      padding: "8px 16px",
      borderRadius: "6px 0 0 6px",
      border: "none",
      outline: "none",
      fontSize: "14px",
      background: "white",
    },
    searchBtn: {
      padding: "8px 16px",
      background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
      color: "white",
      border: "none",
      borderRadius: "0 6px 6px 0",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
    navButtons: {
      display: isMobile ? "none" : "flex",
      gap: "12px",
    },
    btnOutline: {
      padding: isMobile ? "6px 12px" : "8px 16px",
      border: "2px solid white",
      background: "transparent",
      color: "white",
      borderRadius: "6px",
      textDecoration: "none",
      fontWeight: "500",
      transition: "all 0.3s ease",
      display: "inline-flex",
      alignItems: "center",
      fontSize: isMobile ? "14px" : "16px",
    },
    btnPrimary: {
      padding: isMobile ? "6px 12px" : "8px 16px",
      background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
      color: "white",
      border: "none",
      borderRadius: "6px",
      textDecoration: "none",
      fontWeight: "600",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 4px rgba(37, 99, 235, 0.3)",
      display: "inline-flex",
      alignItems: "center",
      fontSize: isMobile ? "14px" : "16px",
      cursor: "pointer",
    },
    btnDanger: {
      padding: isMobile ? "6px 12px" : "8px 16px",
      background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontWeight: "600",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 4px rgba(239, 68, 68, 0.3)",
      cursor: "pointer",
      fontSize: isMobile ? "14px" : "16px",
    },
    mobileMenuToggle: {
      display: isMobile ? "block" : "none",
      background: "none",
      border: "none",
      color: "white",
      fontSize: "24px",
      cursor: "pointer",
      padding: "8px",
    },
    mobileMenu: {
      display: showMobileMenu ? "block" : "none",
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      background: "#1B4B8C",
      padding: "16px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      zIndex: 50,
    },
    mobileSearch: {
      display: "flex",
      marginBottom: "16px",
    },
    mobileSearchInput: {
      flex: 1,
      padding: "12px",
      borderRadius: "6px",
      border: "none",
      outline: "none",
      fontSize: "16px",
    },
    mobileMenuItem: {
      display: "block",
      color: "white",
      textDecoration: "none",
      padding: "12px 0",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      fontSize: "16px",
      background: "none",
      border: "none",
      width: "100%",
      textAlign: "left",
      cursor: "pointer",
    },
  };

  // Efectos hover
  const hoverEffects = {
    btnOutlineHover: {
      background: "white",
      color: "#1B4B8C",
    },
    btnPrimaryHover: {
      transform: "translateY(-1px)",
      boxShadow: "0 4px 8px rgba(37, 99, 235, 0.4)",
    },
    btnDangerHover: {
      transform: "translateY(-1px)",
      boxShadow: "0 4px 8px rgba(239, 68, 68, 0.4)",
    },
    searchBtnHover: {
      transform: "translateY(-1px)",
      boxShadow: "0 4px 8px rgba(37, 99, 235, 0.4)",
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerContainer}>
        {/* Logo */}
        <Link to="/" style={styles.logoSection}>
          <div style={{
            ...styles.logoImg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <svg viewBox="0 0 24 24" fill="white" style={{width: "24px", height: "24px"}}>
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              <path d="M9 12l2 2 4-4" fill="none" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h1 style={styles.companyName}>LyRinnovatech</h1>
            <p style={styles.companyTagline}>Tu Proveedor de Confianza</p>
          </div>
        </Link>

        {/* Search Desktop */}
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

        {/* Botones Desktop */}
        <nav style={styles.navButtons}>
          <Link 
            to="/store" 
            style={styles.btnOutline}
            onMouseEnter={(e) => Object.assign(e.target.style, hoverEffects.btnOutlineHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.btnOutline)}
          >
            <svg style={{width: "18px", height: "18px", marginRight: "8px"}} viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            Tienda
          </Link>

          {!isLogged ? (
            <>
              <Link 
                to="/acceso" 
                style={styles.btnPrimary}
                onMouseEnter={(e) => Object.assign(e.target.style, hoverEffects.btnPrimaryHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.btnPrimary)}
              >
                <svg style={{width: "18px", height: "18px", marginRight: "8px"}} viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="8" r="3" />
                  <path d="M12 14c-4 0-7 2-7 4.5V20h14v-1.5c0-2.5-3-4.5-7-4.5z" />
                  <path d="M16.5 12.5l1.5-1.5 2.5 2.5-4 4-2.5-2.5 1.5-1.5" fill="currentColor" opacity="0.8"/>
                  <circle cx="18" cy="8" r="1.5" fill="currentColor"/>
                </svg>
                Admin
              </Link>
              <Link 
                to="/driver/login" 
                style={styles.btnPrimary}
                onMouseEnter={(e) => Object.assign(e.target.style, hoverEffects.btnPrimaryHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.btnPrimary)}
              >
                <svg style={{width: "18px", height: "18px", marginRight: "8px"}} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  <path d="M18 6h3v3h-3V6z" fill="#EC4899"/>
                  <path d="M19 4h1v2h-1V4z" fill="#EC4899"/>
                  <path d="M20 3h2v1h-2V3z" fill="#EC4899"/>
                </svg>
                Repartidor
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/admin/dashboard")}
                style={styles.btnPrimary}
                onMouseEnter={(e) => Object.assign(e.target.style, hoverEffects.btnPrimaryHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.btnPrimary)}
              >
                <svg style={{width: "18px", height: "18px", marginRight: "8px"}} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
                Dashboard
              </button>
              <button 
                onClick={handleLogout} 
                style={styles.btnDanger}
                onMouseEnter={(e) => Object.assign(e.target.style, hoverEffects.btnDangerHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.btnDanger)}
              >
                <svg style={{width: "18px", height: "18px", marginRight: "8px"}} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
                Salir
              </button>
            </>
          )}
        </nav>

        {/* Toggle móvil */}
        <button
          style={styles.mobileMenuToggle}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          ☰
        </button>
      </div>

      {/* Menu móvil */}
      <div style={styles.mobileMenu}>
        <form onSubmit={handleSearch} style={styles.mobileSearch}>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={styles.mobileSearchInput}
          />
        </form>
        <Link 
          to="/store" 
          style={styles.mobileMenuItem}
          onClick={() => setShowMobileMenu(false)}
        >
          🛒 Tienda
        </Link>
        {!isLogged ? (
          <>
            <Link 
              to="/acceso" 
              style={styles.mobileMenuItem}
              onClick={() => setShowMobileMenu(false)}
            >
              👨‍💼 Admin
            </Link>
            <Link 
              to="/driver/login" 
              style={styles.mobileMenuItem}
              onClick={() => setShowMobileMenu(false)}
            >
              🚚 Repartidor
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                navigate("/admin/dashboard");
                setShowMobileMenu(false);
              }}
              style={styles.mobileMenuItem}
            >
              📊 Dashboard
            </button>
            <button 
              onClick={() => {
                handleLogout();
                setShowMobileMenu(false);
              }} 
              style={styles.mobileMenuItem}
            >
              ❌ Salir
            </button>
          </>
        )}
      </div>
    </header>
  );
}
// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function Home() {
  const [info, setInfo] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoverStates, setHoverStates] = useState({
    featureCards: {},
    buttons: {}
  });

  useEffect(() => {
    api.get("/company").then((r) => setInfo(r.data)).catch(() => {});
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowMobileMenu(false);
  };

  // Manejar estados de hover
  const handleMouseEnter = (type, id) => {
    setHoverStates(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [id]: true
      }
    }));
  };

  const handleMouseLeave = (type, id) => {
    setHoverStates(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [id]: false
      }
    }));
  };

  // Obtener estilos con hover aplicado
  const getHoverStyle = (baseStyle, hoverStyle, type, id) => {
    const isHovered = hoverStates[type] && hoverStates[type][id];
    return isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle;
  };

  // Estilos responsivos basados en el ancho de la ventana
  const isMobile = windowWidth <= 768;
  const isSmallMobile = windowWidth <= 480;

  // Estilos base (sin cambios)
  const styles = {
    body: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      lineHeight: "1.6",
      color: "#1F2937",
      background: "#FFFFFF",
      margin: 0,
      padding: 0,
    },
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
      background: "white",
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
    navButtons: { 
      display: isMobile ? "none" : "flex", 
      gap: "12px" 
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
      cursor: "pointer",
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
    mobileMenuItem: {
      display: "block",
      color: "white",
      textDecoration: "none",
      padding: "12px 0",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      fontSize: "16px",
    },
    hero: {
      background: "linear-gradient(135deg, #1B4B8C 0%, #2563EB 100%)",
      color: "white",
      padding: isMobile ? "48px 0" : "64px 0",
      position: "relative",
      overflow: "hidden",
    },
    heroContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isMobile ? "0 16px" : "0 24px",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: isMobile ? "32px" : "64px",
      alignItems: "center",
      textAlign: isMobile ? "center" : "left",
    },
    heroTitle: {
      fontSize: isSmallMobile ? "28px" : isMobile ? "36px" : "48px",
      fontWeight: "700",
      lineHeight: "1.2",
      marginBottom: "24px",
    },
    heroText: { 
      fontSize: isMobile ? "16px" : "20px", 
      marginBottom: "32px", 
      opacity: 0.95,
      lineHeight: "1.6",
    },
    heroStats: {
      display: "grid",
      gridTemplateColumns: isSmallMobile ? "1fr" : "repeat(3, 1fr)",
      gap: "16px",
      marginTop: "32px",
    },
    statItem: {
      textAlign: "center",
      padding: "16px",
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "8px",
      backdropFilter: "blur(10px)",
    },
    statNumber: { 
      fontSize: isMobile ? "20px" : "24px", 
      fontWeight: "700",
      display: "block",
    },
    statLabel: { 
      fontSize: isMobile ? "12px" : "14px", 
      opacity: 0.9,
    },
    heroImage: { 
      position: "relative",
      zIndex: 2,
    },
    heroCard: {
      background: "white",
      borderRadius: "12px",
      padding: isMobile ? "20px" : "32px",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      color: "#1F2937",
    },
    heroCardTitle: {
      fontSize: isMobile ? "18px" : "20px",
      fontWeight: "700",
      color: "#1B4B8C",
      marginBottom: "16px",
    },
    heroCardList: { 
      listStyle: "none", 
      marginBottom: "24px", 
      padding: 0 
    },
    heroCardItem: { 
      padding: "8px 0", 
      display: "flex", 
      alignItems: "center",
      gap: "8px",
      fontSize: isMobile ? "14px" : "16px",
    },
    checkmark: { 
      color: "#10B981", 
      fontWeight: "700",
      minWidth: "20px",
    },
    heroCardBtn: {
      marginTop: "16px",
      padding: "10px 24px",
      background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "600",
      display: "inline-block",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 4px rgba(37, 99, 235, 0.3)",
      cursor: "pointer",
    },
    features: { 
      padding: isMobile ? "48px 0" : "64px 0", 
      background: "#F8FAFC" 
    },
    featuresContainer: { 
      maxWidth: "1200px", 
      margin: "0 auto", 
      padding: isMobile ? "0 16px" : "0 24px" 
    },
    sectionHeader: { 
      textAlign: "center", 
      marginBottom: isMobile ? "48px" : "64px" 
    },
    sectionTitle: { 
      fontSize: isMobile ? "28px" : "36px", 
      fontWeight: "700", 
      marginBottom: "16px",
      color: "#1F2937",
    },
    sectionSubtitle: { 
      fontSize: isMobile ? "16px" : "18px", 
      color: "#6B7280", 
      maxWidth: "600px", 
      margin: "0 auto",
      lineHeight: "1.6",
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: isSmallMobile ? "1fr" : isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
      gap: isMobile ? "20px" : "32px",
    },
    featureCard: {
      background: "white",
      padding: isMobile ? "20px" : "32px",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    featureIcon: {
      width: isMobile ? "48px" : "64px",
      height: isMobile ? "48px" : "64px",
      background: "linear-gradient(135deg, #1B4B8C 0%, #2563EB 100%)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: isMobile ? "16px" : "24px",
    },
    featureIconSvg: { 
      width: isMobile ? "24px" : "32px", 
      height: isMobile ? "24px" : "32px", 
      color: "white" 
    },
    featureTitle: { 
      fontSize: isMobile ? "18px" : "20px", 
      fontWeight: "700", 
      marginBottom: "12px",
      color: "#1F2937",
    },
    featureText: { 
      color: "#6B7280", 
      lineHeight: "1.6",
      fontSize: isMobile ? "14px" : "16px",
    },
    cta: { 
      background: "#1B4B8C", 
      color: "white", 
      padding: isMobile ? "48px 0" : "64px 0" 
    },
    ctaContainer: { 
      maxWidth: "1200px", 
      margin: "0 auto", 
      textAlign: "center",
      padding: isMobile ? "0 16px" : "0 24px",
    },
    ctaTitle: { 
      fontSize: isMobile ? "28px" : "36px", 
      fontWeight: "700", 
      marginBottom: "16px" 
    },
    ctaText: { 
      fontSize: isMobile ? "16px" : "18px", 
      marginBottom: "32px", 
      opacity: 0.95,
      maxWidth: "600px",
      margin: "0 auto 32px",
    },
    ctaButtons: { 
      display: "flex", 
      gap: "16px", 
      justifyContent: "center", 
      flexWrap: "wrap",
      flexDirection: isSmallMobile ? "column" : "row",
    },
    btnWhite: {
      padding: isMobile ? "12px 20px" : "16px 32px",
      background: "white",
      color: "#1B4B8C",
      borderRadius: "8px",
      fontWeight: "600",
      textDecoration: "none",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    btnPrimaryCta: {
      padding: isMobile ? "12px 20px" : "16px 32px",
      background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontWeight: "600",
      textDecoration: "none",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 4px rgba(37, 99, 235, 0.3)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    footer: { 
      background: "#1F2937", 
      color: "white", 
      padding: isMobile ? "32px 0 16px" : "48px 0 24px" 
    },
    footerContainer: { 
      maxWidth: "1200px", 
      margin: "0 auto", 
      padding: isMobile ? "0 16px" : "0 24px" 
    },
    footerContent: {
      display: "grid",
      gridTemplateColumns: isSmallMobile ? "1fr" : isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(250px, 1fr))",
      gap: isMobile ? "24px" : "32px",
      marginBottom: isMobile ? "24px" : "32px",
    },
    footerTitle: { 
      fontSize: "18px", 
      fontWeight: "700", 
      marginBottom: "16px", 
      color: "#2563EB" 
    },
    footerText: { 
      color: "rgba(255, 255, 255, 0.8)", 
      marginBottom: "8px",
      fontSize: "14px",
      lineHeight: "1.5",
    },
    footerList: { 
      listStyle: "none", 
      padding: 0,
      margin: 0,
    },
    footerListItem: { 
      marginBottom: "8px",
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: "14px",
    },
    socialIcons: {
      display: "flex",
      gap: "12px",
      marginTop: "16px",
    },
    socialIcon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "36px",
      height: "36px",
      borderRadius: "6px",
      background: "rgba(255, 255, 255, 0.1)",
      color: "white",
      textDecoration: "none",
      transition: "all 0.3s ease",
    },
    footerBottom: {
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      paddingTop: isMobile ? "16px" : "24px",
      textAlign: "center",
      color: "rgba(255, 255, 255, 0.6)",
      fontSize: "14px",
    },
  };

  // Estilos de hover
  const hoverEffects = {
    btnOutlineHover: {
      background: "white",
      color: "#1B4B8C",
    },
    btnPrimaryHover: {
      transform: "translateY(-1px)",
      boxShadow: "0 4px 8px rgba(37, 99, 235, 0.4)",
    },
    btnWhiteHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    featureCardHover: {
      transform: "translateY(-4px)",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    },
    heroCardBtnHover: {
      transform: "translateY(-1px)",
      boxShadow: "0 4px 8px rgba(37, 99, 235, 0.4)",
    },
    socialIconHover: {
      background: "#2563EB",
      transform: "translateY(-2px)",
    }
  };

  // Redes sociales
  const socialMedia = [
    {
      name: "Facebook",
      url: "https://facebook.com/lyrinnovatech",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: "Instagram",
      url: "https://instagram.com/lyrinnovatech",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/59342345678",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893          a11.815 11.815 0 0 0-3.656-8.413"/>
        </svg>
      )
    }
  ];

  return (
    <div style={styles.body}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <Link to="/" style={styles.logoSection}>
            <img 
              src="/vite.svg" 
              alt="LyRinnovatech Logo" 
              style={styles.logoImg}
            />
            <div>
              <h1 style={styles.companyName}>LyRinnovatech</h1>
              <p style={styles.companyTagline}>Tu Proveedor de Confianza</p>
            </div>
          </Link>

          <nav style={styles.navButtons}>
            <a
              href="#contacto"
              style={getHoverStyle(styles.btnOutline, hoverEffects.btnOutlineHover, "buttons", "contacto")}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contacto");
              }}
              onMouseEnter={() => handleMouseEnter("buttons", "contacto")}
              onMouseLeave={() => handleMouseLeave("buttons", "contacto")}
            >
              Contacto
            </a>
            <Link 
              to="/store" 
              style={getHoverStyle(styles.btnOutline, hoverEffects.btnOutlineHover, "buttons", "store")}
              onMouseEnter={() => handleMouseEnter("buttons", "store")}
              onMouseLeave={() => handleMouseLeave("buttons", "store")}
            >
              <svg style={{width: "18px", height: "18px", marginRight: "8px"}} viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              Tienda
            </Link>
            <Link 
              to="/acceso" 
              style={getHoverStyle(styles.btnPrimary, hoverEffects.btnPrimaryHover, "buttons", "admin")}
              onMouseEnter={() => handleMouseEnter("buttons", "admin")}
              onMouseLeave={() => handleMouseLeave("buttons", "admin")}
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
              style={getHoverStyle(styles.btnPrimary, hoverEffects.btnPrimaryHover, "buttons", "driver")}
              onMouseEnter={() => handleMouseEnter("buttons", "driver")}
              onMouseLeave={() => handleMouseLeave("buttons", "driver")}
            >
              <svg style={{width: "18px", height: "18px", marginRight: "8px"}} viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                <path d="M18 6h3v3h-3V6z" fill="#EC4899"/>
                <path d="M19 4h1v2h-1V4z" fill="#EC4899"/>
                <path d="M20 3h2v1h-2V3z" fill="#EC4899"/>
              </svg>
              Repartidor
            </Link>
          </nav>

          <button
            style={styles.mobileMenuToggle}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            ☰
          </button>

          <div style={styles.mobileMenu}>
            <a
              href="#contacto"
              style={styles.mobileMenuItem}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contacto");
              }}
            >
              Contacto
            </a>
            <Link to="/store" style={styles.mobileMenuItem}>
              🛒 Tienda
            </Link>
            <Link to="/acceso" style={styles.mobileMenuItem}>
              👨‍💼 Admin
            </Link>
            <Link to="/driver/login" style={styles.mobileMenuItem}>
              🚚 Repartidor
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <div style={styles.heroContent}>
            <h2 style={styles.heroTitle}>
              Equipos de Protección Industrial de Alta Calidad
            </h2>
            <p style={styles.heroText}>
              Nos especializamos en ofrecer soluciones de seguridad para el
              entorno laboral, garantizando la protección de tus trabajadores y
              el cumplimiento normativo.
            </p>

            <div style={styles.heroStats}>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>25+</span>
                <span style={styles.statLabel}>Años de experiencia</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>512+</span>
                <span style={styles.statLabel}>Proyectos exitosos</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>1520+</span>
                <span style={styles.statLabel}>Clientes satisfechos</span>
              </div>
            </div>
          </div>

          <div style={styles.heroImage}>
            <div style={styles.heroCard}>
              <h3 style={styles.heroCardTitle}>¿Por qué elegirnos?</h3>
              <ul style={styles.heroCardList}>
                <li style={styles.heroCardItem}>
                  <span style={styles.checkmark}>✓</span>
                  Calidad garantizada con normativas internacionales
                </li>
                <li style={styles.heroCardItem}>
                  <span style={styles.checkmark}>✓</span>
                  Amplia variedad para todos los sectores
                </li>
                <li style={styles.heroCardItem}>
                  <span style={styles.checkmark}>✓</span>
                  Asesoría personalizada de expertos
                </li>
                <li style={styles.heroCardItem}>
                  <span style={styles.checkmark}>✓</span>
                  Envíos rápidos y seguros
                </li>
                <li style={styles.heroCardItem}>
                  <span style={styles.checkmark}>✓</span>
                  Seguridad y confiabilidad comprobada
                </li>
              </ul>
              <a
                href="#contacto"
                style={getHoverStyle(styles.heroCardBtn, hoverEffects.heroCardBtnHover, "buttons", "quote")}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contacto");
                }}
                onMouseEnter={() => handleMouseEnter("buttons", "quote")}
                onMouseLeave={() => handleMouseLeave("buttons", "quote")}
              >
                Solicitar Cotización
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <div style={styles.featuresContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Nuestros Servicios</h2>
            <p style={styles.sectionSubtitle}>
              Ofrecemos soluciones completas de seguridad industrial adaptadas a
              las necesidades específicas de tu empresa
            </p>
          </div>

          <div style={styles.featuresGrid}>
            {[
              {
                icon: "M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z",
                title: "Calidad Garantizada",
                text: "Todos nuestros productos cumplen con las normativas internacionales de seguridad (ANSI, OSHA, EN) garantizando máxima protección.",
              },
              {
                icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z",
                title: "Variedad y Disponibilidad",
                text: "Amplio catálogo de EPP: cascos, guantes, gafas, equipos respiratorios, auditivos y más. Adaptados a diferentes sectores industriales.",
              },
              {
                icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
                title: "Asesoría Personalizada",
                text: "Nuestro equipo de expertos evalúa los riesgos específicos de tu empresa y recomienda las mejores soluciones de protección.",
              },
              {
                icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
                title: "Envíos Rápidos",
                text: "Sistema de distribución eficiente a nivel nacional con seguimiento en tiempo real. Tu empresa sigue operando con máxima seguridad.",
              },
              {
                icon: "M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H18V1h-2v1H8V1H6v1H4.5C3.67 2 3 2.67 3 3.5V5c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5V3.5c0-.83-.67-1.5-1.5-1.5z",
                title: "Seguridad y Confiabilidad",
                text: "25 años de experiencia respaldando empresas. Desde construcción hasta fábricas, tenemos la experiencia y productos que necesitas.",
              },
              {
                icon: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z",
                title: "Sustentabilidad",
                text: "Comprometidos con prácticas sostenibles y productos eco-amigables que protegen tanto a tus trabajadores como al medio ambiente.",
              },
            ].map((feature, idx) => (
              <div 
                key={idx} 
                style={getHoverStyle(styles.featureCard, hoverEffects.featureCardHover, "featureCards", idx)}
                onMouseEnter={() => handleMouseEnter("featureCards", idx)}
                onMouseLeave={() => handleMouseLeave("featureCards", idx)}
              >
                <div style={styles.featureIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={styles.featureIconSvg}
                  >
                    <path d={feature.icon} />
                  </svg>
                </div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureText}>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta} id="contacto">
        <div style={styles.ctaContainer}>
          <h2 style={styles.ctaTitle}>¿Listo Para Cotizar Con Nosotros?</h2>
          <p style={styles.ctaText}>
            Obtén una cotización personalizada para los equipos de protección
            que tu empresa necesita
          </p>

          <div style={styles.ctaButtons}>
            <a 
              href="mailto:ventas@lyrinnovatech.com" 
              style={getHoverStyle(styles.btnWhite, hoverEffects.btnWhiteHover, "buttons", "email")}
              onMouseEnter={() => handleMouseEnter("buttons", "email")}
              onMouseLeave={() => handleMouseLeave("buttons", "email")}
            >
              Enviar Email
            </a>
            <a 
              href="tel:+593979095601" 
              style={getHoverStyle(styles.btnWhite, hoverEffects.btnWhiteHover, "buttons", "phone")}
              onMouseEnter={() => handleMouseEnter("buttons", "phone")}
              onMouseLeave={() => handleMouseLeave("buttons", "phone")}
            >
              Llamar Ahora
            </a>
            <Link 
              to="/store" 
              style={getHoverStyle(styles.btnWhite, hoverEffects.btnWhiteHover, "buttons", "store2")}
              onMouseEnter={() => handleMouseEnter("buttons", "store2")}
              onMouseLeave={() => handleMouseLeave("buttons", "store2")}
            >
              <svg style={{width: "18px", height: "18px", marginRight: "8px"}} viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              Ver Tienda
            </Link>
            <Link 
              to="/acceso" 
              style={getHoverStyle(styles.btnPrimaryCta, hoverEffects.btnPrimaryHover, "buttons", "admin2")}
              onMouseEnter={() => handleMouseEnter("buttons", "admin2")}
              onMouseLeave={() => handleMouseLeave("buttons", "admin2")}
            >
              Panel Administrativo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerContent}>
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>LyRinnovatech</h3>
              <p style={styles.footerText}>
                Tu proveedor de confianza en equipos de protección industrial con 25 años de experiencia garantizando la seguridad laboral.
              </p>
              <p style={styles.footerText}>
                <strong>Misión:</strong> Proporcionar equipos de protección industrial que cumplan con los más altos estándares de seguridad y calidad.
              </p>
              {/* Iconos de redes sociales */}
              <div style={styles.socialIcons}>
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={getHoverStyle(styles.socialIcon, hoverEffects.socialIconHover, "social", index)}
                    title={social.name}
                    onMouseEnter={() => handleMouseEnter("social", index)}
                    onMouseLeave={() => handleMouseLeave("social", index)}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Nuestros Productos</h3>
              <ul style={styles.footerList}>
                {['Cascos de Seguridad', 'Guantes de Protección', 'Gafas y Protección Visual', 'Equipos Respiratorios', 'Protección Auditiva', 'Ropa de Trabajo', 'Equipos Contra Incendios'].map((item, idx) => (
                  <li key={idx} style={styles.footerListItem}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Sectores que Atendemos</h3>
              <ul style={styles.footerList}>
                {['Construcción', 'Manufactura', 'Minería', 'Petróleo y Gas', 'Agricultura', 'Servicios Públicos'].map((item, idx) => (
                  <li key={idx} style={styles.footerListItem}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Contacto</h3>
              <p style={styles.footerText}>📧 ventas@lyrinnovatech.com</p>
              <p style={styles.footerText}>📞 +593 97 909 5601</p>
              <p style={styles.footerText}>📍 Orellana, Ecuador</p>
              <br />
              <p style={styles.footerText}><strong>Horarios de Atención:</strong></p>
              <p style={styles.footerText}>Lunes a Viernes: 8:00 - 18:00</p>
            </div>
          </div>

          <div style={styles.footerBottom}>
            <p>&copy; 2025 LyRinnovatech. Todos los derechos reservados. | Construimos seguridad con 25 años de experiencia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
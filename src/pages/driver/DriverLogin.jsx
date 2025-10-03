// src/pages/driver/DriverLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

export default function DriverLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/driver/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("driverToken", res.data.token);
        navigate("/driver/dashboard");
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
      console.error("❌ Error driver login:", err);
      setError(err.response?.data?.error || "Credenciales incorrectas. Verifica tus datos e intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={styles.body}>
      <div style={styles.mobileContainer}>
        {/* Indicador de estado */}
        <div style={styles.statusIndicator}></div>

        {/* Header con logo */}
        <div style={styles.headerSection}>
          <div style={styles.logo}>
            <svg viewBox="0 0 24 24" fill="currentColor" style={styles.logoSvg}>
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              <path d="M18 6h3v3h-3V6z" fill="#EC4899"/>
              <path d="M19 4h1v2h-1V4z" fill="#EC4899"/>
              <path d="M20 3h2v1h-2V3z" fill="#EC4899"/>
            </svg>
          </div>
          <div style={styles.appTitle}>Repartidor</div>
          <div style={styles.companyName}>LyRinnovatech</div>
        </div>

        {/* Sección de bienvenida */}
        <div style={styles.welcomeSection}>
          <div style={styles.welcomeTitle}>¡Bienvenido!</div>
          <div style={styles.welcomeSubtitle}>
            Ingresa tus datos para comenzar con las entregas
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}

        {/* Formulario */}
        <div style={styles.formSection}>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="email">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                style={styles.formInput}
                placeholder="repartidor@lyrinnovatech.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="password">
                Contraseña
              </label>
              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  style={styles.formInput}
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  style={styles.passwordToggle}
                  onClick={togglePassword}
                >
                  {showPassword ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{
                ...styles.btnPrimary,
                ...(loading && styles.btnPrimaryDisabled)
              }}
              disabled={loading}
            >
              {loading ? (
                <span style={styles.loading}>
                  <div style={styles.spinner}></div>
                  Verificando...
                </span>
              ) : (
                "Iniciar Entregas"
              )}
            </button>
          </form>
        </div>

        {/* Sección de ayuda */}
        <div style={styles.helpSection}>
          <div style={styles.helpTitle}>¿Necesitas ayuda?</div>
          <div style={styles.helpText}>
            Si tienes problemas para acceder, contacta a tu supervisor o llama al número de soporte.
          </div>
          <a href="tel:+5934567890" style={styles.helpPhone}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            +593 97 909 5601
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        
        input:focus {
          outline: none !important;
          border-color: #10B981 !important;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1) !important;
        }
      `}</style>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    background: "linear-gradient(135deg, #1B4B8C 0%, #2563EB 100%)",
    minHeight: "100vh",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  mobileContainer: {
    maxWidth: "375px",
    margin: "0 auto",
    background: "#FFFFFF",
    borderRadius: "24px",
    padding: "32px 24px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    position: "relative",
    overflow: "hidden",
  },
  statusIndicator: {
    position: "absolute",
    top: "16px",
    right: "16px",
    width: "12px",
    height: "12px",
    background: "#10B981",
    borderRadius: "50%",
    animation: "pulse 2s infinite",
  },
  headerSection: {
    textAlign: "center",
    marginBottom: "32px",
    paddingTop: "4px",
  },
  logo: {
    width: "80px",
    height: "80px",
    background: "linear-gradient(135deg, #E8F5E8 0%, #D1F5D1 100%)",
    borderRadius: "40px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.2)",
    position: "relative",
  },
  logoSvg: {
    width: "40px",
    height: "40px",
    color: "#059669",
  },
  appTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: "4px",
  },
  companyName: {
    fontSize: "16px",
    color: "#6B7280",
    fontWeight: "500",
  },
  welcomeSection: {
    textAlign: "center",
    marginBottom: "32px",
  },
  welcomeTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: "8px",
  },
  welcomeSubtitle: {
    fontSize: "16px",
    color: "#6B7280",
    lineHeight: "1.5",
  },
  formSection: {
    marginBottom: "24px",
  },
  formGroup: {
    marginBottom: "16px",
  },
  formLabel: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: "8px",
  },
  formInput: {
    width: "100%",
    padding: "16px 20px",
    border: "2px solid #E5E7EB",
    borderRadius: "12px",
    fontSize: "16px",
    color: "#1F2937",
    background: "#FFFFFF",
    transition: "all 0.3s ease",
  },
  passwordContainer: {
    position: "relative",
  },
  passwordToggle: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#6B7280",
    padding: "8px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
  },
  btnPrimary: {
    width: "100%",
    padding: "18px 24px",
    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginBottom: "24px",
    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
    minHeight: "56px",
  },
  btnPrimaryDisabled: {
    background: "linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)",
    cursor: "not-allowed",
    transform: "none",
    boxShadow: "none",
  },
  loading: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid transparent",
    borderTop: "2px solid currentColor",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  helpSection: {
    textAlign: "center",
    padding: "24px 0 0 0",
    borderTop: "1px solid #E5E7EB",
  },
  helpTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: "8px",
  },
  helpText: {
    fontSize: "14px",
    color: "#6B7280",
    lineHeight: "1.5",
    marginBottom: "16px",
  },
  helpPhone: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "#10B981",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "16px",
    background: "rgba(16, 185, 129, 0.1)",
    padding: "8px 16px",
    borderRadius: "8px",
  },
  errorMessage: {
    background: "#FEF2F2",
    border: "2px solid #FECACA",
    color: "#EF4444",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "14px",
    marginBottom: "24px",
    textAlign: "center",
  },
};
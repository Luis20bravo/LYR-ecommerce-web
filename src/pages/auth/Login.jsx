// src/pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { FaUserShield } from "react-icons/fa";

export default function AdminLogin() {
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
      const res = await api.post("/auth/admin/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/admin/dashboard");
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
      console.error("❌ Error login:", err);
      setError(err.response?.data?.error || "Credenciales incorrectas. Por favor, verifica tus datos.");
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={styles.body}>
      <div style={styles.loginContainer}>
        {/* Barra superior de color */}
        <div style={styles.topBar}></div>

        {/* Logo Section */}
        <div style={styles.logoSection}>
          <div style={styles.logo}>
            <FaUserShield size={34} color="#4F46E5" />
          </div>
          <div style={styles.companyName}>LyRinnovatech</div>
        </div>

        {/* Título del formulario */}
        <div style={styles.formTitle}>Iniciar Sesión Admin</div>
        <div style={styles.formSubtitle}>Accede a tu panel de control</div>

        {/* Mensaje de error */}
        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}

        {/* Formulario */}
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
              placeholder="admin@lyrinnovatech.com"
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
                placeholder="••••••••"
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                Iniciando sesión...
              </span>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        <div style={styles.footerText}>
          © 2025 LyRinnovatech. Todos los derechos reservados.<br />
          Versión 1.0.0
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        input:focus {
          outline: none;
          border-color: #2563EB !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  loginContainer: {
    background: "#FFFFFF",
    borderRadius: "12px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    width: "480px",
    maxWidth: "90vw",
    minHeight: "480px",
    padding: "24px",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topBar: {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #1B4B8C, #2563EB)",
  },
  logoSection: {
    textAlign: "center",
    marginBottom: "8px",
  },
  logo: {
    width: "70px",
    height: "70px",
    background: "linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)",
    borderRadius: "35px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "4px",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.15)",
  },
  logoSvg: {
    width: "34px",
    height: "34px",
    color: "#4F46E5",
  },
  logoSvg: {
    width: "34px",
    height: "34px",
    color: "#4F46E5",
  },
  companyName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 0,
  },
  formTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: "4px",
  },
  formSubtitle: {
    fontSize: "14px",
    color: "#6B7280",
    textAlign: "center",
    marginBottom: "32px",
  },
  formGroup: {
    marginBottom: "6px",
  },
  formLabel: {
    display: "block",
    fontSize: "13px",
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: "4px",
  },
  formInput: {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#1F2937",
    background: "#FFFFFF",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  passwordContainer: {
    position: "relative",
  },
  passwordToggle: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#6B7280",
    padding: "4px",
  },
  formOptions: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "8px",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    accentColor: "#1B4B8C",
  },
  checkboxLabel: {
    fontSize: "13px",
    color: "#6B7280",
  },
  forgotPassword: {
    fontSize: "13px",
    color: "#2563EB",
    textDecoration: "none",
    fontWeight: "500",
  },
  btnPrimary: {
    width: "100%",
    padding: "10px 20px",
    background: "linear-gradient(135deg, #1B4B8C 0%, #2563EB 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginBottom: "8px",
    boxShadow: "0 2px 8px rgba(27, 75, 140, 0.3)",
  },
  btnPrimaryDisabled: {
    background: "linear-gradient(135deg, #9CA3AF 0%, #D1D5DB 100%)",
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
    width: "16px",
    height: "16px",
    border: "2px solid transparent",
    borderTop: "2px solid currentColor",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  divider: {
    textAlign: "center",
    margin: "6px 0",
    position: "relative",
    color: "#6B7280",
    fontSize: "12px",
  },
  footerText: {
    textAlign: "center",
    fontSize: "10px",
    color: "#9CA3AF",
    margin: 0,
    padding: 0,
  },
  errorMessage: {
    background: "#FEF2F2",
    border: "1px solid #FECACA",
    color: "#EF4444",
    padding: "6px 8px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "8px",
  },
};
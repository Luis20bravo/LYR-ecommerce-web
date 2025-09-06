import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Simulamos una validación rápida (ej. podrías pedir /api/auth/verify al backend)
    if (token) {
      setValid(true);
    } else {
      setValid(false);
    }

    setTimeout(() => setChecking(false), 400); // da tiempo al loader
  }, []);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500 border-solid"></div>
        <span className="ml-3">Verificando sesión...</span>
      </div>
    );
  }

  return valid ? <Outlet /> : <Navigate to="/acceso" replace />;
}

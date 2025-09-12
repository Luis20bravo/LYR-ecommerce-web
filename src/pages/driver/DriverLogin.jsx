// src/pages/driver/DriverLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api"; 
import { FaShoppingCart } from "react-icons/fa"; // carrito
import { FaBox } from "react-icons/fa6"; // caja

export default function DriverLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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
      setError(err.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-sm">
        {/* Icono */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <FaShoppingCart className="text-indigo-600 text-6xl" />
            {/* caja dentro del carrito */}
            <FaBox className="text-pink-500 text-2xl absolute -top-2 -right-3" />
          </div>
          <h1 className="mt-3 text-xl font-bold text-gray-800">
            LYRINOVATECH
          </h1>
        </div>

        {/* Card login */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">
            INICIAR SESIÓN
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Introduzca sus datos
          </p>

          {error && (
            <div className="bg-red-500 text-white text-sm p-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Correo */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Correo electrónico
              </label>
              <input
                type="email"
                className="w-full mt-1 px-3 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="driver@lyrinnovatech.com"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full mt-1 px-3 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold"
            >
              INICIAR SESIÓN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

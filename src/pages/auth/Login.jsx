import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api"; // tu instancia axios

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/admin/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token); // guardar token
        navigate("/admin/dashboard"); // redirigir al dashboard
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
      console.error("❌ Error login:", err);
      setError(err.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      <div className="bg-neutral-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Iniciar Sesión
        </h1>

        {error && (
          <div className="bg-red-500 text-white text-sm p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-300">Correo</label>
            <input
              type="email"
              className="input w-full mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@correo.com"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300">Contraseña</label>
            <input
              type="password"
              className="input w-full mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

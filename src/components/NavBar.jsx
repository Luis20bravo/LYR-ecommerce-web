import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (q.trim()) {
      navigate(`/buscar?search=${encodeURIComponent(q)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/acceso");
  };

  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-6">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-grid place-items-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold">
            T
          </span>
          <span className="font-extrabold tracking-tight text-gray-900">
            LYRINOVATECH
          </span>
        </Link>

        {/* Barra búsqueda */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-md mx-6 hidden md:flex"
        >
          <input
            type="text"
            placeholder="Buscar producto..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-l-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
          >
            🔍
          </button>
        </form>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          {!isLogged ? (
            <>
              <Link
                to="/acceso"
                className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50"
              >
                Admin
              </Link>
              <Link
                to="/driver/login"
                className="px-4 py-2 rounded-lg border border-green-600 text-green-600 font-semibold hover:bg-green-50"
              >
                Repartidor
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Salir
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

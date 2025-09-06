import { useEffect, useState } from "react";
import { api } from "../../api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // guardado al login
    if (!token) {
      window.location.href = "/acceso"; // si no hay token → redirigir a login
      return;
    }

    api.get("/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Error cargando dashboard:", err);
        setError("No se pudieron cargar los datos");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

      {/* Tarjetas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-neutral-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Categorías</h2>
          <p className="text-3xl mt-2">{stats.totalCategories}</p>
        </div>

        <div className="bg-neutral-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Productos</h2>
          <p className="text-3xl mt-2">{stats.totalProducts}</p>
        </div>

        <div className="bg-neutral-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Comentarios</h2>
          <p className="text-3xl mt-2">{stats.totalComments}</p>
        </div>
      </div>

      {/* Productos con poco stock */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Productos con poco stock</h2>
        <ul className="space-y-2">
          {stats.lowStockProducts?.length === 0 && (
            <li className="text-neutral-400">Todo en orden ✅</li>
          )}
          {stats.lowStockProducts?.map((p) => (
            <li key={p.id} className="flex justify-between bg-neutral-800 p-3 rounded">
              <span>{p.name}</span>
              <span className="text-red-400">{p.stock} u.</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

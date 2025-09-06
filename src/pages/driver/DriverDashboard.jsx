// src/pages/driver/DriverDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { FaBox, FaCheckSquare, FaClock, FaFileAlt } from "react-icons/fa";

export default function DriverDashboard() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const loadOrders = async () => {
    try {
      const res = await api.get("/driver/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("driverToken")}` },
      });
      setOrders(res.data);
    } catch (e) {
      console.error("❌ Error cargando pedidos:", e);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = filter
    ? orders.filter((o) => o.status === filter)
    : orders;

  const logout = () => {
    localStorage.removeItem("driverToken");
    navigate("/"); // volver a la tienda
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="font-bold text-lg text-gray-800">LYRINOVATECH</h1>
        <div className="flex items-center gap-3">
          <span className="bg-gray-800 text-white text-xs px-3 py-1 rounded">
            REPARTIDOR
          </span>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
          >
            Salir
          </button>
        </div>
      </header>

      {/* Filtro */}
      <div className="p-4">
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Filtro por estado
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        >
          <option value="">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="entregado">Entregado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="flex-1 px-4">
        <table className="w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-gray-600">
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id} className="bg-gray-50 rounded">
                <td className="py-2 text-gray-800">{o.customer_name}</td>
                <td className="py-2 text-gray-800">{o.address}</td>
                <td className="py-2">
                  {o.status === "pendiente" && (
                    <span className="px-3 py-1 rounded bg-yellow-100 text-yellow-800 text-sm font-semibold">
                      Pendiente
                    </span>
                  )}
                  {o.status === "entregado" && (
                    <span className="px-3 py-1 rounded bg-green-100 text-green-800 text-sm font-semibold">
                      Entregado
                    </span>
                  )}
                  {o.status === "cancelado" && (
                    <span className="px-3 py-1 rounded bg-red-100 text-red-800 text-sm font-semibold">
                      Cancelado
                    </span>
                  )}
                </td>
                <td>
                  <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs transition">
                    Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Barra inferior */}
      <nav className="grid grid-cols-4 border-t py-2">
        <button className="flex flex-col items-center text-sm text-gray-700">
          <FaBox className="text-xl mb-1" /> Pedidos
        </button>
        <button className="flex flex-col items-center text-sm text-gray-700">
          <FaCheckSquare className="text-xl mb-1" /> Disponible
        </button>
        <button className="flex flex-col items-center text-sm text-gray-700">
          <FaClock className="text-xl mb-1" /> Historial
        </button>
        <button className="flex flex-col items-center text-sm text-gray-700">
          <FaFileAlt className="text-xl mb-1" /> Reportes
        </button>
      </nav>
    </div>
  );
}

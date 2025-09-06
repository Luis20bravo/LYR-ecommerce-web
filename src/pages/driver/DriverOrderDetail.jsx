// src/pages/driver/DriverOrderDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api";

export default function DriverOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/driver/orders/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("driverToken")}` },
        });
        setOrder(res.data);
      } catch (e) {
        console.error("❌ Error cargando detalle:", e);
        setError("No se pudo cargar el pedido.");
      }
    };
    load();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!order) return <p className="text-gray-500">Cargando pedido...</p>;

  return (
    <div className="min-h-screen bg-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Volver
      </button>

      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Detalle del Pedido #{order.id}
      </h1>

      <div className="space-y-4">
        <p><strong>Cliente:</strong> {order.customer_name}</p>
        <p><strong>Dirección:</strong> {order.address}</p>
        <p><strong>Teléfono:</strong> {order.phone}</p>
        <p><strong>Estado:</strong> {order.status}</p>
        <p><strong>Fecha:</strong> {new Date(order.created_at).toLocaleString()}</p>
      </div>

      <button className="mt-6 w-full py-2 bg-green-600 text-white rounded">
        Marcar como entregado
      </button>
    </div>
  );
}

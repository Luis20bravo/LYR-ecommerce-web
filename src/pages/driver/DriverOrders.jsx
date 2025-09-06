import { useEffect, useState } from "react";
import { api } from "../../api";

export default function DriverOrders() {
  const [orders, setOrders] = useState([]);

  const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("driverToken")}` });

  const loadOrders = async () => {
    try {
      const res = await api.get("/driver/orders/available", { headers: auth() });
      setOrders(res.data);
    } catch (e) {
      console.error("❌ loadOrders:", e);
    }
  };

  const accept = async (id) => {
    if (!window.confirm("¿Aceptar este pedido?")) return;
    try {
      await api.put(`/driver/orders/${id}/accept`, {}, { headers: auth() });
      alert("✅ Pedido aceptado");
      loadOrders();
    } catch (e) {
      console.error("❌ accept:", e);
      alert("❌ Error al aceptar");
    }
  };

  useEffect(() => { loadOrders(); }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">📦 Pedidos disponibles</h1>
      {orders.map(o => (
        <div key={o.id} className="card p-4 flex justify-between items-center">
          <div>
            <p><b>{o.customer_name}</b></p>
            <p>{o.address}</p>
            <p>Total: ${o.total}</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => accept(o.id)}
          >
            Aceptar
          </button>
        </div>
      ))}
      {orders.length === 0 && <p>No hay pedidos disponibles.</p>}
    </div>
  );
}

import { useEffect, useState } from "react";
import { api } from "../../api";
import { toast } from "react-toastify";

export default function AdminComments() {
  const [comments, setComments] = useState([]);

  // Header con token
  const auth = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  // Cargar comentarios
  const load = async () => {
    try {
      const res = await api.get("/admin/comments", { headers: auth() });
      setComments(res.data);
    } catch (e) {
      console.error("❌ load comments:", e);
      toast.error("Error al cargar comentarios");
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Cambiar estado (aprobar/rechazar)
  const updateStatus = async (id, status) => {
    try {
      await api.put(
        `/admin/comments/${id}`,
        { status }, // { status: "approved" } o { status: "rejected" }
        { headers: auth() }
      );
      toast.success(`Comentario ${status}`);
      load();
    } catch (e) {
      console.error("❌ updateStatus:", e);
      toast.error("Error al actualizar comentario");
    }
  };

  // Eliminar comentario
  const remove = async (id) => {
    if (!window.confirm("¿Eliminar comentario permanentemente?")) return;
    try {
      await api.delete(`/admin/comments/${id}`, { headers: auth() });
      toast.success("🗑️ Comentario eliminado");
      load();
    } catch (e) {
      console.error("❌ remove:", e);
      toast.error("Error al eliminar comentario");
    }
  };

  return (
    <div className="card p-4">
      <h2 className="font-semibold mb-4">
        Comentarios ({comments.length})
      </h2>
      <table className="w-full text-sm border">
        <thead>
          <tr className="border-b bg-neutral-800 text-neutral-100">
            <th className="text-left py-2 px-2">Usuario</th>
            <th className="text-left py-2 px-2">Email</th>
            <th className="text-left py-2 px-2">Teléfono</th>
            <th className="text-left py-2 px-2">Comentario</th>
            <th className="text-left py-2 px-2">Producto</th>
            <th className="text-left py-2 px-2">Estado</th>
            <th className="text-left py-2 px-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((c) => (
            <tr key={c.id} className="border-b hover:bg-neutral-900">
              <td className="py-2 px-2">{c.name}</td>
              <td className="py-2 px-2">{c.email ?? "-"}</td>
              <td className="py-2 px-2">{c.phone ?? "-"}</td>
              <td className="py-2 px-2">{c.message}</td>
              <td className="py-2 px-2">{c.product_name ?? "-"}</td>
              <td className="py-2 px-2">
                {c.status === "approved"
                  ? "✅ Aprobado"
                  : c.status === "rejected"
                  ? "❌ Rechazado"
                  : "⏳ Pendiente"}
              </td>
              <td className="py-2 px-2 flex gap-2">
                {c.status !== "approved" && (
                  <button
                    className="px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                    onClick={() => updateStatus(c.id, "approved")}
                  >
                    Aprobar
                  </button>
                )}
                {c.status !== "rejected" && (
                  <button
                    className="px-2 py-1 rounded bg-yellow-600 text-white hover:bg-yellow-700"
                    onClick={() => updateStatus(c.id, "rejected")}
                  >
                    Rechazar
                  </button>
                )}
                <button
                  className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  onClick={() => remove(c.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {comments.length === 0 && (
            <tr>
              <td colSpan="7" className="py-4 text-center text-neutral-400">
                No hay comentarios aún
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

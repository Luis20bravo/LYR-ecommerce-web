import { useEffect, useState } from "react";
import { api } from "../../api";
import Swal from "sweetalert2";

export default function AdminCategories() {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

  // Cargar categorías
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/admin/categories", { headers: auth() });
        setCats(res.data);
      } catch (e) {
        console.error("❌ Error load:", e);
        Swal.fire("❌ Error", "No se pudieron cargar las categorías.", "error");
      }
    };
    load();
  }, []);

  // Resetear formulario
  const resetForm = () => {
    setName("");
    setEditId(null);
  };

  // Crear o actualizar
  const save = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      Swal.fire("⚠️ Atención", "El nombre es obligatorio.", "warning");
      return;
    }

    try {
      if (editId) {
        await api.put(`/admin/categories/${editId}`, { name }, { headers: auth() });
        Swal.fire("✅ Actualizado", "La categoría se actualizó correctamente.", "success");
      } else {
        await api.post("/admin/categories", { name }, { headers: auth() });
        Swal.fire("✅ Creada", "La categoría se creó correctamente.", "success");
      }
      resetForm();
      const res = await api.get("/admin/categories", { headers: auth() });
      setCats(res.data);
    } catch (e) {
      console.error("❌ save:", e);
      Swal.fire("❌ Error", "No se pudo guardar la categoría.", "error");
    }
  };

  // Editar (cargar datos al form)
  const handleEdit = (cat) => {
    setName(cat.name);
    setEditId(cat.id);
  };

  // Activar/Desactivar categoría
  const toggle = async (id, active) => {
    try {
      await api.put(`/admin/categories/${id}`, { active }, { headers: auth() });
      Swal.fire(
        "✅ Estado cambiado",
        `La categoría fue ${active ? "activada" : "desactivada"} correctamente.`,
        "success"
      );
      const res = await api.get("/admin/categories", { headers: auth() });
      setCats(res.data);
    } catch (e) {
      console.error("❌ toggle:", e);
      Swal.fire("❌ Error", "No se pudo cambiar el estado de la categoría.", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Formulario */}
      <div className="card p-5">
        <h2 className="text-lg font-semibold mb-4">
          {editId ? "Editar categoría" : "Crear categoría"}
        </h2>
        <form onSubmit={save} className="flex gap-3">
          <input
            className="input"
            placeholder="Nombre"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button className="btn btn-primary">
            {editId ? "Actualizar" : "Guardar"}
          </button>
          {editId && (
            <button type="button" className="btn" onClick={resetForm}>
              Cancelar
            </button>
          )}
        </form>
      </div>

      {/* Tabla */}
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-900/70 text-white">
            <tr className="[&>th]:text-left [&>th]:px-4 [&>th]:py-3">
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cats.map(c => (
              <tr key={c.id} className="border-t border-neutral-800 [&>td]:px-4 [&>td]:py-3">
                <td>{c.name}</td>
                <td>{c.active ? "✅ Activo" : "❌ Inactivo"}</td>
                <td className="flex gap-2">
                  <button className="btn" onClick={() => handleEdit(c)}>Editar</button>
                  {c.active ? (
                    <button className="btn bg-yellow-600" onClick={() => toggle(c.id, 0)}>
                      Desactivar
                    </button>
                  ) : (
                    <button className="btn bg-green-600" onClick={() => toggle(c.id, 1)}>
                      Activar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

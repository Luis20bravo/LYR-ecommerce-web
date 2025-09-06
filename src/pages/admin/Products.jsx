import { useEffect, useState } from "react";
import { api } from "../../api.js";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [cats, setCats] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
    image: null,
    image_url: "",
    spec_url: "",
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

  // ✅ cargar productos + categorías
  const load = async () => {
    try {
      const [p, c] = await Promise.all([
        api.get(`/admin/products?search=${encodeURIComponent(search)}`, { headers: auth() }),
        api.get("/admin/categories", { headers: auth() }),
      ]);
      setItems(p.data);
      setCats(c.data);
    } catch (e) {
      console.error("❌ load:", e);
      toast.error("❌ Error al cargar productos");
    }
  };

  useEffect(() => {
    load();
  }, [search]);

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      stock: "",
      category_id: "",
      image: null,
      image_url: "",
      spec_url: "",
    });
    setEditId(null);
  };

  // ✅ guardar producto (crear/editar) con modal de éxito
  const save = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in form) {
        if (key === "image_url") continue; // no enviar este campo
        if (form[key] !== null && form[key] !== "") {
          data.append(key, form[key]);
        }
      }

      if (editId) {
        await api.put(`/admin/products/${editId}`, data, {
          headers: { ...auth(), "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Actualizado", "✅ Producto actualizado correctamente", "success");
      } else {
        await api.post("/admin/products", data, {
          headers: { ...auth(), "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Guardado", "✅ Producto creado correctamente", "success");
      }

      resetForm();
      await load(); // recargar lista al instante
    } catch (e) {
      console.error("❌ save:", e);
      Swal.fire("Error", "❌ No se pudo guardar el producto", "error");
    }
  };

  const edit = (p) => {
    setForm({
      name: p.name,
      price: p.price,
      stock: p.stock,
      category_id: p.category_id,
      image: null,
      image_url: p.image_url,
      spec_url: p.spec_url || "",
    });
    setEditId(p.id);
  };

  // ✅ eliminar con modal bonito
  const remove = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/admin/products/hard/${id}`, { headers: auth() });
      setItems((prev) => prev.filter((p) => p.id !== id));
      Swal.fire("Eliminado", "🗑️ El producto fue eliminado permanentemente.", "success");
    } catch (e) {
      console.error("❌ remove:", e);
      Swal.fire("Error", "❌ No se pudo eliminar el producto.", "error");
    }
  };

  // ✅ activar/desactivar funcionando
  const toggle = async (id, active) => {
    try {
      await api.put(
        `/admin/products/${id}`,
        { active }, // enviar JSON
        { headers: { ...auth(), "Content-Type": "application/json" } }
      );

      // actualizar estado inmediato
      setItems((prev) =>
        prev.map((p) => (p.id === id ? { ...p, active } : p))
      );

      Swal.fire(
        "Estado actualizado",
        `✅ Producto ${active ? "activado" : "desactivado"} correctamente`,
        "success"
      );
    } catch (e) {
      console.error("❌ toggle:", e);
      Swal.fire("Error", "❌ No se pudo cambiar el estado del producto.", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Buscar */}
      <div className="flex gap-3">
        <input
          className="input flex-1"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Formulario */}
      <div className="card p-5">
        <h2 className="text-lg font-semibold mb-4">
          {editId ? "Editar producto" : "Añadir producto"}
        </h2>
        <form onSubmit={save} className="grid md:grid-cols-3 gap-3">
          <input
            className="input"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="number"
            className="input"
            placeholder="Precio"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            type="number"
            className="input"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
          <select
            className="input"
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          >
            <option value="">Categoría…</option>
            {cats.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Imagen con preview */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            />
            {form.image_url && !form.image && (
              <img
                src={`http://localhost:4000${form.image_url}`}
                alt="Vista previa"
                className="w-32 h-32 object-cover rounded mt-2 border"
              />
            )}
            {form.image && (
              <img
                src={URL.createObjectURL(form.image)}
                alt="Vista previa nueva"
                className="w-32 h-32 object-cover rounded mt-2 border"
              />
            )}
          </div>

          <input
            className="input"
            placeholder="Ficha técnica URL"
            value={form.spec_url}
            onChange={(e) => setForm({ ...form, spec_url: e.target.value })}
          />

          <div className="md:col-span-3 flex gap-2">
            <button className="btn btn-primary">
              {editId ? "Actualizar" : "Guardar"}
            </button>
            {editId && (
              <button type="button" className="btn" onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista */}
      <div className="card p-4">
        <h2 className="font-semibold mb-4">Productos ({items.length})</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Imagen</th>
              <th className="text-left py-2">Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-b">
                <td>
                  {p.image_url && (
                    <img
                      src={`http://localhost:4000${p.image_url}`}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.stock}</td>
                <td>{p.category}</td>
                <td>{p.active ? "✅ Activo" : "❌ Inactivo"}</td>
                <td className="flex gap-2">
                  <button className="btn" onClick={() => edit(p)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => remove(p.id)}>Eliminar</button>
                  {p.active ? (
                    <button className="btn bg-yellow-600" onClick={() => toggle(p.id, 0)}>Desactivar</button>
                  ) : (
                    <button className="btn bg-green-600" onClick={() => toggle(p.id, 1)}>Activar</button>
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

import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  // 🔑 Logout limpio en frontend
  const logout = () => {
    localStorage.removeItem("token"); // elimina el token
    window.location.href = "/";        // redirige directo al Home
  };

  // 🔗 Estilos de enlaces activos/inactivos
  const link = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-neutral-800 ${
      isActive ? "bg-neutral-800 text-white" : "text-neutral-300"
    }`;

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <aside className="border-r border-neutral-800 p-4 space-y-3 bg-neutral-900">
        <div className="font-extrabold text-xl mb-4">LYRINOVATECH</div>
        <nav className="space-y-2">
          <NavLink to="/admin/dashboard" className={link}>Dashboard</NavLink>
          <NavLink to="/admin/categorias" className={link}>Categorías</NavLink>
          <NavLink to="/admin/productos" className={link}>Productos</NavLink>
          <NavLink to="/admin/inventario" className={link}>Inventario</NavLink>
          <NavLink to="/admin/comentarios" className={link}>Comentarios</NavLink> {/* ✅ nuevo */}
        </nav>

        {/* Botón logout */}
        <button
          onClick={logout}
          className="btn mt-6 w-full bg-red-600 hover:bg-red-700 text-white"
        >
          Salir
        </button>
      </aside>

      {/* Contenido */}
      <main>
        <header className="border-b border-neutral-800 px-6 h-16 flex items-center justify-between">
          <div className="text-sm uppercase tracking-wider text-neutral-400">
            Admin
          </div>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

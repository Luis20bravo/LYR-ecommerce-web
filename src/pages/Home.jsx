import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import Navbar from "../components/Navbar";

// Importamos íconos de react-icons/fa
import { FaBoxOpen, FaWarehouse, FaShieldAlt, FaTint, FaBroom, FaHardHat } from "react-icons/fa";

// Diccionario de íconos por categoría
const icons = {
  Absorbentes: <FaTint className="text-sky-500 text-3xl" />,
  Almacenamiento: <FaWarehouse className="text-yellow-500 text-3xl" />,
  Contención: <FaShieldAlt className="text-red-500 text-3xl" />,
  Derrames: <FaBoxOpen className="text-purple-500 text-3xl" />,
  EPP: <FaHardHat className="text-green-500 text-3xl" />,
  "Limpieza industrial": <FaBroom className="text-pink-500 text-3xl" />,
};

export default function Home() {
  const [info, setInfo] = useState(null);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    api.get("/company").then((r) => setInfo(r.data));
    api.get("/categories").then((r) => setCats(r.data));
  }, []);

  return (
    <div className="bg-gradient-to-b from-neutral-50 to-neutral-100 min-h-screen text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <header className="relative text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
          Bienvenido a <span className="text-indigo-600">LYRinnovatech</span>
        </h1>
        {info && (
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {info.about}
          </p>
        )}
      </header>

      {/* Categorías */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Explora nuestras categorías
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8">
          {cats.map((c) => (
            <Link
              key={c.id}
              to={`/categoria/${c.id}`}
              className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition flex flex-col items-center justify-center cursor-pointer"
            >
              {icons[c.name] || <FaBoxOpen className="text-gray-400 text-3xl" />}
              <h3 className="mt-4 text-lg font-semibold">{c.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {c.active ? "Disponible" : "Próximamente"}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

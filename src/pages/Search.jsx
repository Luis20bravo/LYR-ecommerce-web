import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "../api";
import Navbar from "../components/NavBar";

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get("search") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    api
      .get(`/products?search=${encodeURIComponent(q)}`)
      .then((r) => setProducts(r.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="bg-neutral-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-6">
          Resultados de búsqueda para:{" "}
          <span className="text-indigo-600">{q}</span>
        </h1>

        {loading && <p className="text-gray-500">Buscando...</p>}

        {!loading && products.length === 0 && (
          <p className="text-gray-500">No se encontraron productos.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((p) => {
            const imageSrc = p.image_url
              ? p.image_url.startsWith("http")
                ? p.image_url
                : `http://localhost:4000${p.image_url}`
              : "https://via.placeholder.com/200";

            return (
              <Link
                key={p.id}
                to={`/producto/${p.id}`} // 👈 enlace al detalle
                className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition block"
              >
                <img
                  src={imageSrc}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h2 className="mt-4 text-lg font-semibold text-gray-800">
                  {p.name}
                </h2>
                <p className="text-gray-600">
                  ${Number(p.price ?? 0).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  {p.stock > 0 ? `Stock: ${p.stock}` : "Agotado"}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

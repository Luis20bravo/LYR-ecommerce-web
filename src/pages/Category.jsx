// src/pages/Category.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Category() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // estado datos
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // estado filtros (desde URL si existen)
  const [term, setTerm] = useState(searchParams.get("search") ?? "");
  const [min, setMin] = useState(searchParams.get("minPrice") ?? "");
  const [max, setMax] = useState(searchParams.get("maxPrice") ?? "");
  const [onlyStock, setOnlyStock] = useState(searchParams.get("inStock") === "1");

  const [q, setQ] = useState(""); // para buscador arriba

  const abortRef = useRef(null);

  const paramsObj = useMemo(() => {
    const obj = {};
    if (term) obj.search = term;
    if (min) obj.minPrice = min;
    if (max) obj.maxPrice = max;
    if (onlyStock) obj.inStock = "1";
    return obj;
  }, [term, min, max, onlyStock]);

  const fetchProducts = async (signal, queryObj = paramsObj) => {
    setLoading(true);
    setErr("");
    try {
      const qs = new URLSearchParams(queryObj).toString();
      const url = qs ? `/products/${id}?${qs}` : `/products/${id}`;
      const r = await api.get(url, { signal });
      setProducts(Array.isArray(r.data) ? r.data : []);
    } catch (e) {
      if (!signal?.aborted) setErr("No se pudieron cargar los productos.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  };

  // carga inicial y cuando cambia categoría o URL directamente
  useEffect(() => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const currentParams = Object.fromEntries(searchParams.entries());
    fetchProducts(ac.signal, currentParams);

    return () => ac.abort();
  }, [id, searchParams]);

  const applyFilters = () => {
    const next = new URLSearchParams(paramsObj);
    setSearchParams(next);
  };

  const resetFilters = () => {
    setTerm("");
    setMin("");
    setMax("");
    setOnlyStock(false);
    setSearchParams({});
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (q.trim()) {
      navigate(`/buscar?search=${encodeURIComponent(q)}`);
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen flex flex-col">
      {/* 🔎 Buscador arriba (navbar simplificado) */}
      <header className="bg-cyan-500 text-white shadow p-4 flex items-center justify-between">
        <form
          onSubmit={handleSearch}
          className="flex flex-1 max-w-lg bg-white rounded-lg overflow-hidden"
        >
          <input
            type="text"
            placeholder="Buscar producto..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 px-4 py-2 text-gray-700 outline-none"
          />
          <button
            type="submit"
            className="px-4 bg-orange-500 hover:bg-orange-600 transition text-white font-semibold"
          >
            🔍
          </button>
        </form>

        {/* 🔙 Botón regresar */}
        <Link
          to="/store"
          className="ml-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 transition text-white font-semibold rounded-lg"
        >
          ← Volver a categorías
        </Link>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8 flex-1">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Productos</h1>
          {!!products?.length && !loading && (
            <span className="text-sm text-neutral-400">
              {products.length} ítems
            </span>
          )}
        </header>

        {/* Filtros */}
        <div className="card p-4 grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="md:col-span-2">
            <label className="block text-xs mb-1 text-neutral-400">Buscar</label>
            <input
              className="input"
              placeholder="Nombre, código…"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs mb-1 text-neutral-400">Precio mín</label>
            <input
              className="input"
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-xs mb-1 text-neutral-400">Precio máx</label>
            <input
              className="input"
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              placeholder="999.99"
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={onlyStock}
              onChange={(e) => setOnlyStock(e.target.checked)}
            />
            <span className="text-sm">Solo disponibles</span>
          </label>

          <div className="md:col-span-5 flex gap-2">
            <button className="btn btn-primary" onClick={applyFilters}>
              Aplicar
            </button>
            <button className="btn" onClick={resetFilters}>
              Limpiar
            </button>
          </div>
        </div>

        {/* Estados */}
        {loading && <p className="text-gray-500">Cargando productos…</p>}
        {!loading && err && <p className="text-rose-500">{err}</p>}
        {!loading && !err && products.length === 0 && (
          <p className="text-gray-500">No se encontraron productos.</p>
        )}

        {/* Lista de productos */}
        {!loading && !err && products.length > 0 && (
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
                  to={`/producto/${p.id}`}
                  className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition block"
                >
                  <img
                    src={imageSrc}
                    alt={p.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h2 className="mt-4 text-lg font-semibold">{p.name}</h2>
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
        )}
      </div>
    </div>
  );
}

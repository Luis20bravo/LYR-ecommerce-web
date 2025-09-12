// src/pages/admin/Dashboard.jsx
import { useEffect, useMemo, useState } from "react";
import { api } from "../../api";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Controles de consulta (sin botón aplicar)
  const [lowStockThreshold, setLowStockThreshold] = useState(5);
  const [lowStockLimit, setLowStockLimit] = useState(5);

  const token = useMemo(() => localStorage.getItem("token"), []);

  const load = async () => {
    if (!token) {
      window.location.href = "/acceso";
      return;
    }
    setLoading(true);
    setErr("");
    try {
      const res = await api.get(
        `/admin/dashboard?lowStock=${encodeURIComponent(lowStockThreshold)}&limit=${encodeURIComponent(lowStockLimit)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMetrics(res.data);
    } catch (e) {
      console.error("❌ load dashboard:", e);
      setErr("No se pudieron cargar las métricas.");
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recarga cuando cambian los filtros (sin botón aplicar)
  useEffect(() => {
    // Pequeño debounce para evitar llamadas excesivas
    const t = setTimeout(() => load(), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lowStockThreshold, lowStockLimit]);

  const pieGeneralData = useMemo(() => {
    if (!metrics) return null;
    return {
      labels: ["Categorías", "Productos", "Comentarios"],
      datasets: [
        {
          data: [
            metrics.totalCategories ?? 0,
            metrics.totalProducts ?? 0,
            metrics.totalComments ?? 0,
          ],
          backgroundColor: ["#00BCD4", "#FF9800", "#1DE9B6"],
        },
      ],
    };
  }, [metrics]);

  const barLowStockData = useMemo(() => {
    if (!metrics) return null;
    const items = metrics.lowStockProducts ?? [];
    return {
      labels: items.map((p) => p.name),
      datasets: [
        {
          label: "Stock",
          data: items.map((p) => p.stock),
          backgroundColor: "#FF6D00",
        },
      ],
    };
  }, [metrics]);

  const barProductsByCategoryData = useMemo(() => {
    if (!metrics) return null;
    const rows = metrics.productsByCategory ?? [];
    return {
      labels: rows.map((r) => r.name),
      datasets: [
        {
          label: "Productos",
          data: rows.map((r) => r.products),
          backgroundColor: "#3B82F6",
        },
      ],
    };
  }, [metrics]);

  const commonChartOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#E5E7EB" } },
      title: { color: "#E5E7EB" },
      tooltip: {},
    },
    scales: {
      x: {
        ticks: { color: "#9CA3AF" },
        grid: { color: "rgba(255,255,255,0.06)" },
      },
      y: {
        ticks: { color: "#9CA3AF" },
        grid: { color: "rgba(255,255,255,0.06)" },
      },
    },
  };

  if (loading) return <p className="text-center mt-10 text-neutral-300">Cargando...</p>;
  if (err) return <p className="text-center mt-10 text-red-400">{err}</p>;
  if (!metrics) return null;

  const lowList = metrics.lowStockProducts ?? [];
  const latest = metrics.latestComments ?? [];

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6 space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-3xl font-bold">Dashboard Admin</h1>

        {/* Controles (auto recarga, sin botón aplicar) */}
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Umbral bajo stock</label>
            <input
              type="number"
              min={0}
              max={9999}
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(Number(e.target.value || 0))}
              className="w-28 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Límite lista</label>
            <input
              type="number"
              min={1}
              max={20}
              value={lowStockLimit}
              onChange={(e) =>
                setLowStockLimit(Math.max(1, Math.min(20, Number(e.target.value || 1))))
              }
              className="w-28 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Cards principales */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <CardStat title="Categorías" value={metrics.totalCategories} />
        <CardStat title="Productos" value={metrics.totalProducts} />
        <CardStat title="Stock Total" value={metrics.stockTotal} />
        <CardStat title="Comentarios" value={metrics.totalComments} />
        <CardStat title="Sin stock" value={metrics.outOfStock} tone="red" />
        <CardStat title="Bajo stock" value={metrics.lowStockCount} tone="amber" />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neutral-850 bg-neutral-800 p-6 rounded-2xl border border-neutral-800 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Resumen general</h3>
          <div className="h-64">
            {pieGeneralData && <Pie data={pieGeneralData} options={{ ...commonChartOpts }} />}
          </div>
        </div>

        <div className="bg-neutral-850 bg-neutral-800 p-6 rounded-2xl border border-neutral-800 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Productos con poco stock</h3>
          {lowList.length === 0 ? (
            <p className="text-neutral-400">Todo en orden ✅</p>
          ) : (
            <div className="h-64">
              <Bar data={barLowStockData} options={{ ...commonChartOpts }} />
            </div>
          )}
        </div>

        <div className="bg-neutral-850 bg-neutral-800 p-6 rounded-2xl border border-neutral-800 shadow-lg lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Productos por categoría</h3>
          <div className="h-72">
            {barProductsByCategoryData?.labels?.length ? (
              <Bar data={barProductsByCategoryData} options={{ ...commonChartOpts }} />
            ) : (
              <p className="text-neutral-400">Sin datos de categorías.</p>
            )}
          </div>
        </div>
      </div>

      {/* Listas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-800 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Productos con poco stock</h3>
          <ul className="space-y-2">
            {lowList.length === 0 && (
              <li className="text-neutral-400">Todo en orden ✅</li>
            )}
            {lowList.map((p) => (
              <li
                key={p.id}
                className="flex justify-between items-center bg-neutral-900/60 p-3 rounded-xl border border-neutral-800"
              >
                <span className="truncate pr-3">{p.name}</span>
                <span className="text-red-400 font-semibold">{p.stock} u.</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-800 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Últimos comentarios</h3>
          {latest.length === 0 ? (
            <p className="text-neutral-400">Sin comentarios recientes.</p>
          ) : (
            <ul className="space-y-3">
              {latest.map((c) => (
                <li key={c.id} className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-400">Prod. #{c.product_id}</span>
                    <span className="text-xs text-neutral-500">ID {c.id}</span>
                  </div>
                  <p className="mt-1 text-sm">
                    <span className="text-indigo-400 font-medium">{c.name}:</span>{" "}
                    <span className="text-neutral-200">{c.message}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function CardStat({ title, value, tone = "indigo" }) {
  const tones = {
    indigo: "text-indigo-400",
    red: "text-red-400",
    amber: "text-amber-400",
    green: "text-green-400",
    sky: "text-sky-400",
  };
  return (
    <div className="bg-neutral-800 p-5 rounded-2xl border border-neutral-800 shadow-lg">
      <h3 className="text-sm text-neutral-400">{title}</h3>
      <p className={`text-3xl font-bold mt-1 ${tones[tone] || tones.indigo}`}>
        {Number(value ?? 0).toLocaleString()}
      </p>
    </div>
  );
}

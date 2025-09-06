import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      {/* Logos */}
      <div className="flex gap-6 mb-8">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="h-16 hover:scale-110 transition" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="h-16 hover:scale-110 transition" alt="React logo" />
        </a>
      </div>

      {/* Título */}
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        🚀 Vite + React + Tailwind
      </h1>

      {/* Botón con contador */}
      <div className="card bg-white shadow-md rounded-lg p-6">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          count is {count}
        </button>
        <p className="mt-4 text-sm text-gray-600">
          Edita <code>src/App.jsx</code> y guarda para probar HMR 🔥
        </p>
      </div>

      {/* Nota */}
      <p className="mt-6 text-gray-500 text-sm text-center">
        Haz clic en los logos de Vite y React para aprender más
      </p>
    </div>
  );
}

export default App;

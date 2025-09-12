// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get(`/products/spec/${id}`)
      .then((r) => setProduct(r.data))
      .catch((e) => console.error("❌ Error cargando producto:", e));

    api
      .get(`/public/comments?product_id=${id}`)
      .then((r) => setComments(r.data))
      .catch((e) => console.error("❌ Error cargando comentarios:", e));
  }, [id]);

  const handleComment = async () => {
    if (!message.trim()) return;
    try {
      await api.post("/public/comments", {
        product_id: id,
        message,
        name: "Anónimo",
      });
      setMessage("");
      const r = await api.get(`/public/comments?product_id=${id}`);
      setComments(r.data);
    } catch (e) {
      console.error("❌ Error enviando comentario:", e);
      alert("Error al enviar comentario");
    }
  };

  if (!product) return <p className="p-6">Cargando producto...</p>;

  // 👇 lógica de imagen con fallback
  const imageSrc = product.image_url
    ? product.image_url.startsWith("http")
      ? product.image_url
      : `http://localhost:4000${product.image_url}`
    : "https://via.placeholder.com/450";

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Contenedor de producto */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Imagen */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-[450px] object-cover"
            />
          </div>

          {/* Información */}
          <div className="space-y-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed">
              {product.description}
            </p>

            <p className="text-2xl font-bold text-green-600">
              ${Number(product.price).toFixed(2)}
            </p>

            <p className="text-gray-700">
              Disponibilidad:{" "}
              <span className="font-semibold">{product.stock}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button className="flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition">
                Agregar al carrito
              </button>
              {product.spec_url && (
                <a
                  href={product.spec_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-6 py-3 bg-red-100 text-red-700 font-semibold rounded-lg shadow hover:bg-red-200 transition text-center"
                >
                  Solicitar ficha técnica
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Comentarios */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comentarios
          </h2>

          {comments.length === 0 ? (
            <p className="text-gray-600">
              Sé el primero en comentar este producto.
            </p>
          ) : (
            <ul className="space-y-4">
              {comments.map((c) => (
                <li
                  key={c.id}
                  className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                >
                  <p className="text-gray-800">{c.message}</p>
                  <span className="text-sm text-gray-500">— {c.name}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Formulario */}
          <div className="mt-6">
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-800"
              rows="3"
              placeholder="Escribe tu comentario..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleComment}
              className="mt-3 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Enviar comentario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

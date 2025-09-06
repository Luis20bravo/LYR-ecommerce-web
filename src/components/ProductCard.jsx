import { Link } from "react-router-dom";

export default function ProductCard({ p }) {
  return (
    <Link to={`/producto/${p.id}`} className="block">
      <img
        src={`http://localhost:4000${p.image_url}`}
        alt={p.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="mt-2 font-semibold">{p.name}</h3>
      <p className="text-green-600">${p.price}</p>
    </Link>
  );
}

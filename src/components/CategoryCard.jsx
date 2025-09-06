import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link to={`/categoria/${category.id}`} className="p-6 border rounded-lg shadow hover:shadow-lg bg-white">
      <h3 className="font-semibold text-lg text-gray-800">{category.name}</h3>
    </Link>
  );
}

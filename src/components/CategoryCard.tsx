import { Link } from "react-router-dom";
import type { Category } from "../types/recipe";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({
  category,
}: CategoryCardProps) {
  return (
    <Link
      to={`/category/${encodeURIComponent(category.strCategory)}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={category.strCategoryThumb}
          alt={category.strCategory}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900">
          {category.strCategory}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {category.strCategoryDescription}
        </p>

        <span className="mt-4 inline-block font-semibold text-orange-500">
          View Recipes →
        </span>
      </div>
    </Link>
  );
}
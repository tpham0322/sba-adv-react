import { Link, useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useFetch } from "../hooks/useFetch";
import type { MealsResponse } from "../types/recipe";

const API_URL =
  "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

export default function Category() {
  const { categoryName } = useParams();

  const category = decodeURIComponent(categoryName ?? "");

  const url = `${API_URL}${encodeURIComponent(category)}`;

  const {
    data,
    loading,
    error,
  } = useFetch<MealsResponse>(url);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-block font-semibold text-orange-500 transition hover:text-orange-600"
      >
        ← Back to Categories
      </Link>

      {/* Page Heading */}
      <div className="mb-8 mt-8">
        <p className="font-semibold uppercase tracking-wider text-orange-500">
          Category
        </p>

        <h1 className="mt-1 text-4xl font-black text-gray-900">
          {category}
        </h1>

        <p className="mt-2 text-gray-500">
          Browse delicious {category.toLowerCase()} recipes.
        </p>
      </div>

      {/* Loading */}
      {loading && <Spinner />}

      {/* Error */}
      {error && <ErrorMessage message={error} />}

      {/* No Results */}
      {!loading &&
        !error &&
        (!data?.meals || data.meals.length === 0) && (
          <div className="rounded-2xl bg-gray-100 p-10 text-center">
            <div className="text-5xl">🍽️</div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              No Recipes Found
            </h2>

            <p className="mt-2 text-gray-500">
              There are no recipes available for this category.
            </p>
          </div>
        )}

      {/* Recipes */}
      {!loading &&
        !error &&
        data?.meals &&
        data.meals.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.meals.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                meal={meal}
              />
            ))}
          </div>
        )}
    </main>
  );
}
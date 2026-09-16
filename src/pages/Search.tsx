import { Link, useSearchParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import type { MealsResponse } from "../types/recipe";
import { useFetch } from "../hooks/useFetch";

export default function Search() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
    query
  )}`;

  const { data, loading, error } =
    useFetch<MealsResponse>(url);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="font-semibold text-orange-500 hover:text-orange-600"
      >
        ← Back Home
      </Link>

      <div className="mb-8 mt-8">
        <p className="font-semibold uppercase tracking-wider text-orange-500">
          Search Results
        </p>

        <h1 className="mt-1 text-4xl font-black text-gray-900">
          Results for "{query}"
        </h1>
      </div>

      {loading && <Spinner />}

      {error && <ErrorMessage message={error} />}

      {!loading &&
        !error &&
        (!data?.meals || data.meals.length === 0) && (
          <div className="rounded-2xl bg-gray-50 px-6 py-16 text-center">
            <div className="text-5xl">🔍</div>

            <h2 className="mt-5 text-2xl font-black text-gray-900">
              No recipes found
            </h2>

            <p className="mt-2 text-gray-500">
              Try searching for another recipe.
            </p>
          </div>
        )}

      {!loading && !error && data?.meals && (
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
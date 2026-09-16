import CategoryCard from "../components/CategoryCard";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import type { CategoriesResponse } from "../types/recipe";
import { useFetch } from "../hooks/useFetch";

const API_URL =
  "https://www.themealdb.com/api/json/v1/1/categories.php";

export default function Home() {
  const { data, loading, error } =
    useFetch<CategoriesResponse>(API_URL);

  return (
    <main>
      <section className="bg-gradient-to-br from-orange-500 to-amber-400">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <p className="mb-4 font-semibold uppercase tracking-widest text-orange-100">
              Discover something delicious
            </p>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Find your next favorite recipe.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-orange-50">
              Explore recipes from around the world, browse
              categories, search for specific meals, and save your
              favorites.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="font-semibold uppercase tracking-wider text-orange-500">
            Explore
          </p>

          <h2 className="mt-1 text-3xl font-black text-gray-900">
            Recipe Categories
          </h2>

          <p className="mt-2 text-gray-500">
            Choose a category to start discovering recipes.
          </p>
        </div>

        {loading && <Spinner />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && data?.categories && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.categories.map((category) => (
              <CategoryCard
                key={category.idCategory}
                category={category}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
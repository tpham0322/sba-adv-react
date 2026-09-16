import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useFetch } from "../hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";
import type { Meal, MealDetailResponse } from "../types/recipe";

export default function RecipeDetail() {
  const { recipeId } = useParams();

  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useFavorites();

  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

  const {
    data,
    loading,
    error,
  } = useFetch<MealDetailResponse>(url);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12">
        <Spinner />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12">
        <ErrorMessage message={error} />
      </main>
    );
  }

  const meal: Meal | undefined = data?.meals?.[0];

  if (!meal) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-3xl font-black text-gray-900">
          Recipe Not Found
        </h1>

        <p className="mt-3 text-gray-500">
          We couldn't find the recipe you're looking for.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Back Home
        </Link>
      </main>
    );
  }

  const favorite = isFavorite(meal.idMeal);

  const ingredients = Array.from(
    { length: 20 },
    (_, index) => index + 1
  )
    .map((index) => ({
      ingredient: meal[`strIngredient${index}`],
      measure: meal[`strMeasure${index}`],
    }))
    .filter(
      (item) =>
        item.ingredient &&
        item.ingredient.trim() !== ""
    );

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal.idMeal);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back */}
      <button
        onClick={() => window.history.back()}
        className="font-semibold text-orange-500 transition hover:text-orange-600"
      >
        ← Back
      </button>

      {/* Recipe Header */}
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full rounded-3xl object-cover shadow-xl"
          />
        </div>

        {/* Details */}
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {meal.strCategory && (
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
                {meal.strCategory}
              </span>
            )}

            {meal.strArea && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
                {meal.strArea}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-5 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            {meal.strMeal}
          </h1>

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className={`mt-6 rounded-xl px-6 py-3 font-bold transition ${
              favorite
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            {favorite
              ? "❤️ Remove from Favorites"
              : "🤍 Add to Favorites"}
          </button>

          {/* Ingredients */}
          <div className="mt-10">
            <h2 className="text-2xl font-black text-gray-900">
              Ingredients
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {ingredients.map((item, index) => (
                <div
                  key={`${item.ingredient}-${index}`}
                  className="rounded-xl bg-gray-50 p-4"
                >
                  <p className="font-semibold text-gray-900">
                    {item.ingredient}
                  </p>

                  {item.measure && (
                    <p className="mt-1 text-sm text-gray-500">
                      {item.measure}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <section className="mt-14">
        <h2 className="text-3xl font-black text-gray-900">
          Instructions
        </h2>

        <div className="mt-5 rounded-2xl bg-gray-50 p-6 sm:p-8">
          <p className="whitespace-pre-line leading-8 text-gray-700">
            {meal.strInstructions}
          </p>
        </div>
      </section>

      {/* External Links */}
      {(meal.strYoutube || meal.strSource) && (
        <section className="mt-10 flex flex-wrap gap-4">
          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Watch on YouTube
            </a>
          )}

          {meal.strSource && (
            <a
              href={meal.strSource}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              View Original Recipe
            </a>
          )}
        </section>
      )}
    </main>
  );
}
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import EmptyState from "../components/EmptyState";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useFavorites } from "../context/FavoritesContext";
import { useFetch } from "../hooks/useFetch";
import type { MealDetailResponse } from "../types/recipe";

export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <EmptyState
          title="No Favorites Yet"
          message="You haven't saved any recipes yet. Browse recipes and save your favorites to find them here."
        />
      </main>
    );
  }

  return <FavoritesList favorites={favorites} />;
}

interface FavoritesListProps {
  favorites: string[];
}

function FavoritesList({
  favorites,
}: FavoritesListProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="font-semibold uppercase tracking-wider text-orange-500">
          Your Collection
        </p>

        <h1 className="mt-1 text-4xl font-black text-gray-900">
          Favorite Recipes
        </h1>

        <p className="mt-2 text-gray-500">
          {favorites.length} saved recipe
          {favorites.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favorites.map((id) => (
          <FavoriteRecipe
            key={id}
            id={id}
          />
        ))}
      </div>
    </main>
  );
}

interface FavoriteRecipeProps {
  id: string;
}

function FavoriteRecipe({
  id,
}: FavoriteRecipeProps) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  const { data, loading, error } =
    useFetch<MealDetailResponse>(url);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
        <Spinner />
      </div>
    );
  }

  if (error || !data?.meals?.[0]) {
    return (
      <div className="rounded-2xl bg-red-50 p-5">
        <ErrorMessage message="Unable to load this favorite." />
      </div>
    );
  }

  const meal = data.meals[0];

  return (
    <RecipeCard
      meal={{
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
      }}
    />
  );
}
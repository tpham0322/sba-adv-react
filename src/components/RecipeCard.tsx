import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import type { MealSummary } from "../types/recipe";

interface RecipeCardProps {
  meal: MealSummary;
}

export default function RecipeCard({
  meal,
}: RecipeCardProps) {
  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useFavorites();

  const favorite = isFavorite(meal.idMeal);

  const handleFavorite = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (favorite) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal.idMeal);
    }
  };

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/recipe/${meal.idMeal}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <button
            onClick={handleFavorite}
            aria-label={
              favorite
                ? `Remove ${meal.strMeal} from favorites`
                : `Add ${meal.strMeal} to favorites`
            }
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-xl shadow-md transition hover:scale-110"
          >
            {favorite ? "❤️" : "🤍"}
          </button>
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 text-lg font-bold text-gray-900">
            {meal.strMeal}
          </h3>

          <p className="mt-2 font-medium text-orange-500">
            View Recipe →
          </p>
        </div>
      </Link>
    </div>
  );
}
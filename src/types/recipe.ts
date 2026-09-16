export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;

  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface MealsResponse {
  meals: MealSummary[] | null;
}

export interface MealDetailResponse {
  meals: Meal[] | null;
}
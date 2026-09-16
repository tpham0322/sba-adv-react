# RecipeFinder

## Project Structure

\`\`\`text
recipe-discovery/
├── public/
├── src/
│   ├── components/
│   │   ├── CategoryCard.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── Navbar.tsx
│   │   ├── RecipeCard.tsx
│   │   └── Spinner.tsx
│   ├── context/
│   │   └── FavoritesContext.tsx
│   ├── hooks/
│   │   ├── useFetch.ts
│   │   └── useLocalStorage.ts
│   ├── pages/
│   │   ├── Category.tsx
│   │   ├── Favorites.tsx
│   │   ├── Home.tsx
│   │   ├── RecipeDetail.tsx
│   │   └── Search.tsx
│   ├── types/
│   │   └── recipe.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
\`\`\`

## Features

- Browse all available recipe categories
- Browse recipes by category
- Search for recipes by name
- View detailed recipe information
- View ingredients and measurements
- View recipe instructions
- Add recipes to favorites
- Remove recipes from favorites
- Persist favorites using localStorage
- Global favorites state using React Context API
- Dynamic routing with React Router
- Loading states while fetching API data
- Error handling for failed API requests
- Responsive design
- Reusable React components
- Custom `useFetch` hook
- Custom `useLocalStorage` hook

## Technologies

- React
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS v4
- TheMealDB API
- Browser localStorage

## API

This project uses the free TheMealDB API.

API Documentation: https://www.themealdb.com/api.php

Endpoints used:

- Categories: https://www.themealdb.com/api/json/v1/1/categories.php
- Category Recipes: https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
- Recipe Details: https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
- Recipe Search: https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

## Installation

Clone the repository:

\`\`\`bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd recipe-discovery
npm install
npm run dev
\`\`\`

Open the local development URL provided by Vite.

## Routes

| Route | Description |
|---|---|
| `/` | Home page displaying recipe categories |
| `/category/:categoryName` | Displays recipes from a selected category |
| `/recipe/:recipeId` | Displays detailed information about a recipe |
| `/favorites` | Displays the user's favorite recipes |
| `/search?query=chicken` | Displays search results |

## Custom Hooks

### useFetch

The `useFetch` hook is a generic custom hook used to handle API requests throughout the application.

It manages:

- API data
- Loading state
- Error state
- Request cancellation

Example:

\`\`\`typescript
const { data, loading, error } = useFetch<MealsResponse>(url);
\`\`\`

### useLocalStorage

The `useLocalStorage` hook synchronizes React state with the browser's localStorage.

This allows favorite recipe IDs to remain saved after refreshing or reopening the browser.

Example:

\`\`\`typescript
const [favorites, setFavorites] =
  useLocalStorage<string[]>("recipe-favorites", []);
\`\`\`

## Context API

The application uses a `FavoritesContext` to manage favorite recipes globally.

The context provides:

- `favorites`
- `addFavorite()`
- `removeFavorite()`
- `isFavorite()`

The `FavoritesProvider` wraps the application so that all relevant components can access the favorites state.

## Favorite Persistence

Favorite recipe IDs are stored in localStorage using the key:

`recipe-favorites`

Only recipe IDs are stored rather than complete recipe objects. The Favorites page uses those IDs to retrieve the current recipe information from TheMealDB API.

## State Management

### useState

`useState` is used for local component state such as the search input.

### useEffect

`useEffect` is used by the custom hooks to handle API requests and synchronize data with localStorage.

### Context API

The Context API is used for favorites because the same state is needed by the Navbar, RecipeCard, RecipeDetail, and Favorites pages.

## Routing

React Router provides client-side routing.

Dynamic category routes use:

`/category/:categoryName`

Dynamic recipe routes use:

`/recipe/:recipeId`

Search uses a query parameter:

`/search?query=Arrabiata`

The `useParams` hook retrieves dynamic route parameters, while `useSearchParams` retrieves the search query.

## Loading and Error Handling

The application displays a loading spinner while API requests are being processed.

If an API request fails, an error message and retry option are displayed.

The application also handles:

- Recipes that cannot be found
- Empty search results
- Empty categories
- Users with no favorite recipes

## Reusable Components

### Navbar

Provides application navigation, recipe search, and the favorites count.

### RecipeCard

Displays a recipe image, recipe name, favorite button, and link to the recipe detail page.

### CategoryCard

Displays a category image, category name, description, and link to the category page.

### Spinner

Displays a reusable loading indicator.

### ErrorMessage

Displays API and application errors consistently.

### EmptyState

Displays a message when there is no content to display.

## Design Decisions

I chose to use the React Context API for the favorites feature because favorites are accessed by multiple components throughout the application.

The Navbar displays the number of favorites, RecipeCard allows users to add or remove favorites, RecipeDetail allows users to manage a favorite, and the Favorites page displays saved recipes.

Using Context prevents favorite data from having to be passed through multiple levels of props.

I chose to store only recipe IDs in localStorage instead of storing complete recipe objects. This keeps the stored data small and allows the application to retrieve current recipe information from the API.

I created a generic `useFetch` hook so the same data-fetching logic could be reused across multiple pages while maintaining TypeScript type safety.

Tailwind CSS v4 was used to create a responsive interface directly within the React components.

## Reflection

The most challenging part of this project was coordinating API data with global favorites state.

The application stores favorite recipe IDs in localStorage. The Favorites page then uses those IDs to request the corresponding recipe information from TheMealDB API.

Another challenge was creating a reusable data-fetching hook that could work with different API response structures.

Using TypeScript generics with `useFetch` allowed the same hook to work with category responses, recipe lists, and individual recipe details while maintaining type safety.

The Context API also helped keep the favorites state synchronized throughout the application. When a recipe is added or removed from favorites, the changes are reflected in the recipe cards, recipe detail page, Favorites page, and favorites counter in the navigation bar.

## Future Improvements

- Recipe pagination
- Recipe sorting
- Advanced search filters
- Random recipe discovery
- Dark mode
- Improved recipe recommendations
- User accounts
- Cloud-based favorite storage
- Additional recipe categories and filters

## Author

Truong Pham
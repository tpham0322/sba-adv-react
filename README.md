# RecipeFinder

RecipeFinder is a client-side recipe discovery application built with React, TypeScript, Vite, Tailwind CSS v4, and the TheMealDB API.

The application allows users to browse recipe categories, search for recipes, view detailed recipe information, and save recipes to a personal favorites list.

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

The application uses the following endpoints:

- Categories: https://www.themealdb.com/api/json/v1/1/categories.php
- Category Recipes: https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
- Recipe Details: https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
- Recipe Search: https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd recipe-discovery
npm install
npm run dev
```

Open the local development URL provided by Vite.

## Project Structure

```text
recipe-discovery/
├── public/
│
├── src/
│   ├── components/
│   │   ├── CategoryCard.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── Navbar.tsx
│   │   ├── RecipeCard.tsx
│   │   └── Spinner.tsx
│   │
│   ├── context/
│   │   └── FavoritesContext.tsx
│   │
│   ├── hooks/
│   │   ├── useFetch.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── pages/
│   │   ├── Category.tsx
│   │   ├── Favorites.tsx
│   │   ├── Home.tsx
│   │   ├── RecipeDetail.tsx
│   │   └── Search.tsx
│   │
│   ├── types/
│   │   └── recipe.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

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

```typescript
const { data, loading, error } = useFetch<MealsResponse>(url);
```

### useLocalStorage

The `useLocalStorage` hook synchronizes React state with the browser's localStorage.

This allows favorite recipe IDs to remain saved after refreshing or reopening the browser.

Example:

```typescript
const [favorites, setFavorites] =
  useLocalStorage<string[]>("recipe-favorites", []);
```

## Context API

The application uses a `FavoritesContext` to manage favorite recipes globally.

The context provides:

- `favorites`
- `addFavorite()`
- `removeFavorite()`
- `isFavorite()`

This allows multiple components to access and update the same favorites state without passing props through multiple levels.

## Favorite Persistence

Favorite recipe IDs are stored in the browser's localStorage using the key:

```text
recipe-favorites
```

Only the recipe IDs are stored rather than the complete recipe objects.

When the Favorites page loads, the saved IDs are used to retrieve the current recipe information from TheMealDB API.

## State Management

### useState

`useState` is used for local component state such as:

- Search input
- API data
- Loading state
- Error state

### useEffect

`useEffect` is used inside the `useFetch` hook to request data whenever the API URL changes.

It is also used inside `useLocalStorage` to synchronize state changes with localStorage.

### Context API

The Context API is used for favorites because favorites are accessed by several unrelated components.

The Navbar, RecipeCard, RecipeDetail, and Favorites page all need access to the same favorites state.

## Routing

React Router is used to provide client-side routing.

Dynamic routes are used for categories and recipes:

- `/category/:categoryName`
- `/recipe/:recipeId`

For example:

- `/category/Seafood`
- `/recipe/52772`

The `useParams` hook retrieves the dynamic values from the URL.

Search uses URL query parameters:

- `/search?query=Arrabiata`

The `useSearchParams` hook is used to retrieve the search query.

## Loading and Error Handling

The application provides user feedback while API requests are being processed.

A reusable `Spinner` component displays a loading indicator.

A reusable `ErrorMessage` component displays an error message when an API request fails.

The application also handles cases where:

- No recipes are found
- A recipe does not exist
- The user has no favorite recipes

## Reusable Components

### Navbar

The `Navbar` component provides:

- Application branding
- Home navigation
- Favorites navigation
- Favorite count
- Recipe search

### RecipeCard

The `RecipeCard` component displays:

- Recipe image
- Recipe name
- Favorite button
- Link to the recipe detail page

### CategoryCard

The `CategoryCard` component displays:

- Category image
- Category name
- Category description
- Link to the category page

### Spinner

The `Spinner` component provides a reusable loading indicator.

### ErrorMessage

The `ErrorMessage` component provides consistent error feedback throughout the application.

### EmptyState

The `EmptyState` component displays a message when there is no content to show, such as when the user has no favorite recipes.

## Design Decisions

I chose to use the React Context API for the favorites feature because favorites are used by multiple components throughout the application.

The Navbar displays the number of favorites, RecipeCard allows users to add or remove favorites, RecipeDetail allows users to manage a favorite, and the Favorites page displays saved recipes.

Using Context prevents favorite data from having to be passed through multiple levels of props.

I chose to store only recipe IDs in localStorage instead of storing complete recipe objects. This keeps the stored data small and allows the application to retrieve current recipe information from the API.

I also created a generic `useFetch` hook so that the same data-fetching logic could be reused across the Home, Category, Search, Recipe Detail, and Favorites pages.

Tailwind CSS v4 was used to create the application's responsive interface directly within the React components.

## Reflection

The most challenging part of this project was coordinating API data with global favorites state.

The application stores favorite recipe IDs in localStorage. The Favorites page then uses those IDs to request the corresponding recipe information from TheMealDB API.

Another challenge was creating a reusable data-fetching hook that could work with different API response structures.

Using TypeScript generics with `useFetch` allowed the same hook to work with category responses, recipe lists, and individual recipe details while maintaining type safety.

The Context API also helped keep the favorites state synchronized throughout the application. When a recipe is added or removed from favorites, the changes are reflected in the recipe cards, recipe detail page, Favorites page, and favorite counter in the navigation bar.

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

Created as part of a React Software Engineering assignment.
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/category/:categoryName"
            element={<Category />}
          />

          <Route
            path="/recipe/:recipeId"
            element={<RecipeDetail />}
          />

          <Route
            path="/favorites"
            element={<Favorites />}
          />

          <Route
            path="/search"
            element={<Search />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>

        <footer className="mt-16 border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-gray-500">
            <p>
              RecipeFinder • Powered by TheMealDB
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 text-center">
      <h1 className="text-6xl font-black text-gray-900">
        404
      </h1>

      <p className="mt-4 text-gray-500">
        The page you're looking for doesn't exist.
      </p>

      <a
        href="/"
        className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white"
      >
        Go Home
      </a>
    </main>
  );
}

export default App;
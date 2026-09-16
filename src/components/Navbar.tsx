import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function Navbar() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { favorites } = useFavorites();

  const handleSearch = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    navigate(
      `/search?query=${encodeURIComponent(trimmedQuery)}`
    );

    setQuery("");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="mr-auto text-2xl font-black tracking-tight text-gray-900"
        >
          Recipe<span className="text-orange-500">Finder</span>
        </Link>

        {/* Search */}
        <div className="order-3 w-full md:order-none md:w-auto md:flex-1">
          <form
            onSubmit={handleSearch}
            className="mx-auto flex max-w-xl"
          >
            <input
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search recipes..."
              className="min-w-0 flex-1 rounded-l-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />

            <button
              type="submit"
              className="rounded-r-xl bg-orange-500 px-5 font-semibold text-white transition hover:bg-orange-600"
            >
              Search
            </button>
          </form>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              location.pathname === "/"
                ? "bg-orange-100 text-orange-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Home
          </Link>

          <Link
            to="/favorites"
            className={`relative rounded-lg px-3 py-2 text-sm font-semibold transition ${
              location.pathname === "/favorites"
                ? "bg-orange-100 text-orange-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Favorites

            {favorites.length > 0 && (
              <span className="ml-1 rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
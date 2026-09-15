import { Link } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  message: string;
}

export default function EmptyState({
  title,
  message,
}: EmptyStateProps) {
  return (
    <div className="mx-auto max-w-lg py-20 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-4xl">
        🍽️
      </div>

      <h2 className="mt-6 text-2xl font-bold text-gray-900">
        {title}
      </h2>

      <p className="mt-3 text-gray-500">{message}</p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
      >
        Browse Recipes
      </Link>
    </div>
  );
}
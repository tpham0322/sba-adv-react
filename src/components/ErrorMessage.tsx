interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({
  message = "Something went wrong.",
}: ErrorMessageProps) {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <h2 className="text-lg font-bold text-red-700">
        Unable to load data
      </h2>

      <p className="mt-2 text-sm text-red-600">{message}</p>

      <button
        onClick={() => window.location.reload()}
        className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
}
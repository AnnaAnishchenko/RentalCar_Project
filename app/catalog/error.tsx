"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-2xl font-semibold text-red-600">
        Failed to load catalog
      </h2>

      <p className="mt-3 text-gray-500">{error.message}</p>

      <button
        onClick={reset}
        className="mt-6 rounded-xl bg-black px-5 py-3 text-white transition hover:opacity-90"
      >
        Try again
      </button>
    </section>
  );
}

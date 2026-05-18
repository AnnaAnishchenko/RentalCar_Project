// catalog/error.tsx
// "use client";

// type Props = {
//   error: Error;
//   reset: () => void;
// };

// const Error = ({ error, reset }: Props) => {
//   return (
//     <div>
//       <h2>Error while loading</h2>
//       <p>{error.message}</p>
//       <button onClick={reset}>Try again</button>
//     </div>
//   );
// };

// export default Error;

"use client";

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
      <h2 className="text-lg font-semibold text-red-700">Сталася помилка</h2>

      <p className="mt-2 text-sm text-red-600">{error.message}</p>

      <button
        onClick={reset}
        className="mt-3 rounded-lg bg-red-600 px-3 py-1.5 text-white hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}

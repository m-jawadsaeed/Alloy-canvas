interface Props {
  title?: string;
  message?: string;
}

export default function Error({
  title = "Something went wrong",
  message = "An unexpected error occurred.",
}: Props) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-500">{title}</h1>

        <p className="text-slate-400 mt-4">{message}</p>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

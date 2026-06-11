export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      <div className="w-14 h-14 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />

      <h2 className="mt-6 text-white text-lg font-semibold">
        Loading workspace...
      </h2>
    </div>
  );
}

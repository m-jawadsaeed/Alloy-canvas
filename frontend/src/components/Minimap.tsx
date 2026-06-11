export default function Minimap() {
  return (
    <div className="absolute bottom-5 right-5 w-56 h-36 bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: "radial-gradient(#d4d4d4 1px, transparent 1px)",
          backgroundSize: "15px 15px",
        }}
      />

      <div className="absolute inset-4 border-2 border-blue-500 rounded-lg" />
    </div>
  );
}

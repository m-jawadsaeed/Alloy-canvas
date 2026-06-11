export default function LayersPanel() {
  const layers = ["Rectangle", "Circle", "Text Layer", "Sticky Note"];

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-3">
        {layers.map((layer, index) => (
          <div
            key={index}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3 hover:border-blue-500 cursor-pointer transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">{layer}</span>

              <span className="text-xs text-slate-400">#{index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface Props {
  onClose: () => void;
}

export default function TextTool({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">Add Text</h2>

        <textarea
          rows={4}
          placeholder="Write something..."
          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-700 text-white"
          >
            Cancel
          </button>

          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

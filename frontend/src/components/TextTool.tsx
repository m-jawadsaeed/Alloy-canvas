import { useState } from "react";

interface Props {
  onAdd: (text: string) => void;
}

export default function TextTool({ onAdd }: Props) {
  const [text, setText] = useState("");

  return (
    <div className="fixed bottom-6 left-6 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl z-40 w-72">
      <h3 className="text-white font-semibold mb-3">Add Text</h3>

      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white resize-none"
        placeholder="Type text..."
      />

      <button
        onClick={() => {
          if (!text.trim()) return;

          onAdd(text);
          setText("");
        }}
        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white font-medium"
      >
        Add To Canvas
      </button>
    </div>
  );
}

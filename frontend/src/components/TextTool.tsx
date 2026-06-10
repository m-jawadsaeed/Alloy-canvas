import { useState } from "react";

interface Props {
  onAdd: (
    text: string
  ) => void;
}

export default function TextTool({
  onAdd,
}: Props) {
  const [text, setText] =
    useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) =>
          setText(
            e.target.value
          )
        }
      />

      <button
        onClick={() => {
          if (!text)
            return;

          onAdd(text);

          setText("");
        }}
      >
        Add Text
      </button>
    </div>
  );
}
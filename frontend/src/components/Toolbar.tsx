import type { Dispatch, SetStateAction } from "react";

interface Props {
  tool: string;

  setTool: Dispatch<
    SetStateAction<string>
  >;

  color: string;

  setColor: Dispatch<
    SetStateAction<string>
  >;

  lineWidth: number;

  setLineWidth: Dispatch<
    SetStateAction<number>
  >;

  clearCanvas: () => void;

  undo: () => void;
}

export default function Toolbar({
  tool,
  setTool,
  color,
  setColor,
  lineWidth,
  setLineWidth,
  clearCanvas,
  undo,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "10px",
        alignItems: "center",
      }}
    >
      <button
        onClick={() =>
          setTool("pencil")
        }
      >
        Pencil
      </button>

      <button
        onClick={() =>
          setTool("eraser")
        }
      >
        Eraser
      </button>

      <input
        type="color"
        value={color}
        onChange={(e) =>
          setColor(
            e.target.value
          )
        }
      />

      <input
        type="range"
        min={1}
        max={20}
        value={lineWidth}
        onChange={(e) =>
          setLineWidth(
            Number(
              e.target.value
            )
          )
        }
      />

      <span>
        {lineWidth}px
      </span>

      <button
        onClick={undo}
      >
        Undo
      </button>

      <button
        onClick={
          clearCanvas
        }
      >
        Clear
      </button>

      <span>
        Current Tool:
        {tool}
      </span>
    </div>
  );
}
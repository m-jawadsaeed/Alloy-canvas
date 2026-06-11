interface SelectionBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function SelectionBox({
  x,
  y,
  width,
  height,
}: SelectionBoxProps) {
  return (
    <div
      className="pointer-events-none absolute border-2 border-blue-500 bg-blue-500/10"
      style={{
        left: x,
        top: y,
        width,
        height,
      }}
    />
  );
}

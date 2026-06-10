interface Props {
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
}: Props) {
  return (
    <div
      style={{
        position:
          "absolute",

        left: x,
        top: y,

        width,
        height,

        border:
          "2px dashed blue",

        pointerEvents:
          "none",
      }}
    />
  );
}
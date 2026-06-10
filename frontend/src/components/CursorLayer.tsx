interface Cursor {
  id: string;

  x: number;

  y: number;

  username: string;
}

interface Props {
  cursors: Cursor[];
}

export default function CursorLayer({
  cursors,
}: Props) {
  return (
    <>
      {cursors.map(
        (cursor) => (
          <div
            key={cursor.id}
            style={{
              position:
                "absolute",

              left:
                cursor.x,

              top:
                cursor.y,

              pointerEvents:
                "none",
            }}
          >
            🖱️
            {
              cursor.username
            }
          </div>
        )
      )}
    </>
  );
}
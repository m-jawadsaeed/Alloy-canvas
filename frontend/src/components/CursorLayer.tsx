interface Cursor {
  id: string;
  username: string;
  x: number;
  y: number;
}

interface Props {
  cursors: Cursor[];
}

export default function CursorLayer({ cursors }: Props) {
  return (
    <>
      {cursors.map((cursor) => (
        <div
          key={cursor.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: cursor.x,
            top: cursor.y,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M4 2L20 12L13 13L15 21L12 22L10 14L4 18V2Z" />
          </svg>

          <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            {cursor.username}
          </div>
        </div>
      ))}
    </>
  );
}

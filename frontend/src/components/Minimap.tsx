interface MinimapProps {
  roomName: string;
  usersCount: number;
}

export default function Minimap({ roomName, usersCount }: MinimapProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 h-40 w-64 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
      <div className="border-b border-slate-800 p-3">
        <h3 className="text-sm font-semibold text-white">Minimap</h3>
      </div>

      <div className="flex h-full flex-col justify-between p-4">
        <div>
          <p className="text-xs text-slate-400">Room</p>

          <p className="font-medium text-white">{roomName}</p>
        </div>

        <div>
          <p className="text-xs text-slate-400">Active Users</p>

          <p className="font-medium text-white">{usersCount}</p>
        </div>
      </div>
    </div>
  );
}

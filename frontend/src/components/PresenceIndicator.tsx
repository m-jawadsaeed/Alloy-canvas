interface User {
  id: string;
  username: string;
}

interface PresenceIndicatorProps {
  users: User[];
}

export default function PresenceIndicator({ users }: PresenceIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {users.slice(0, 5).map((user) => (
          <div
            key={user.id}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-950 bg-blue-600 text-xs font-bold text-white"
          >
            {user.username.charAt(0).toUpperCase()}
          </div>
        ))}
      </div>

      <div className="text-sm text-slate-400">{users.length} online</div>
    </div>
  );
}

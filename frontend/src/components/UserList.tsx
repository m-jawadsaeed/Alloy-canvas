import type { User } from "../types/user";

interface Props {
  users: User[];
}

export default function UserList({ users }: Props) {
  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="mb-4">
        <h2 className="text-white font-bold">Online Users</h2>

        <p className="text-slate-400 text-sm">{users.length} connected</p>
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl p-3"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {user.username?.charAt(0).toUpperCase()}
              </div>

              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full" />
            </div>

            <div>
              <p className="text-white font-medium">{user.username}</p>

              <p className="text-xs text-green-400">Online</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import type { User } from "../types/user";
interface Props {
  users: User[];
}

export default function UserList({ users }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5">
      <h3 className="font-semibold mb-4">Online Users</h3>

      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full" />

            <span>{user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

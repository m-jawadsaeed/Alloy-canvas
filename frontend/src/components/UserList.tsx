interface User {
  id: string;
  username: string;
}

interface Props {
  users: User[];
}

export default function UsersList({
  users,
}: Props) {
  return (
    <div>
      <h3>Users</h3>

      {users.map((user) => (
        <div key={user.id}>
          {user.username}
        </div>
      ))}
    </div>
  );
}
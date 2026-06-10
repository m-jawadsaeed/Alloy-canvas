interface Props {
  users: number;
}

export default function PresenceIndicator({
  users,
}: Props) {
  return (
    <div>
      🟢 {users} Online
    </div>
  );
}
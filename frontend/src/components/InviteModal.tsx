interface Props {
  roomId: string;
}

export default function InviteModal({
  roomId,
}: Props) {
  const inviteLink =
    `${window.location.origin}/room/${roomId}`;

  const copyLink =
    async () => {
      await navigator.clipboard.writeText(
        inviteLink
      );

      alert(
        "Invite link copied"
      );
    };

  return (
    <button
      onClick={copyLink}
    >
      Copy Invite Link
    </button>
  );
}
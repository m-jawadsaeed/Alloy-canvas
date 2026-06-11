import { useState } from "react";

interface InviteModalProps {
  roomId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteModal({
  roomId,
  isOpen,
  onClose,
}: InviteModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const inviteLink = `${window.location.origin}/room/${roomId}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(inviteLink);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
        <div className="border-b border-slate-800 p-6">
          <h2 className="text-2xl font-bold text-white">Invite Teammates</h2>

          <p className="mt-2 text-sm text-slate-400">
            Share this room link with your team members.
          </p>
        </div>

        <div className="p-6">
          <label className="mb-2 block text-sm text-slate-400">
            Invite Link
          </label>

          <div className="flex gap-3">
            <input
              readOnly
              value={inviteLink}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-200 outline-none"
            />

            <button
              onClick={copyLink}
              className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-4">
            <h3 className="mb-2 text-sm font-semibold text-white">Room ID</h3>

            <p className="break-all text-sm text-slate-400">{roomId}</p>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-800 p-6">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-5 py-2 text-slate-300 transition hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

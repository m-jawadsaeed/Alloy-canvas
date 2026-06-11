interface Props {
  count: number;
}

export default function PresenceIndicator({ count }: Props) {
  return (
    <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-3 py-1">
      <div className="w-2 h-2 rounded-full bg-green-500" />

      <span className="text-sm text-white">{count} Online</span>
    </div>
  );
}

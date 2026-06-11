interface Activity {
  id: string;
  username: string;
  action: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="h-full overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950">
      <div className="border-b border-slate-800 p-4">
        <h2 className="font-semibold text-white">Activity Feed</h2>
      </div>

      <div className="space-y-3 p-4">
        {activities.map((activity) => (
          <div key={activity.id} className="rounded-xl bg-slate-900 p-3">
            <p className="text-sm text-white">
              <span className="font-semibold">{activity.username}</span>{" "}
              {activity.action}
            </p>

            <span className="text-xs text-slate-500">{activity.timestamp}</span>
          </div>
        ))}

        {activities.length === 0 && (
          <p className="text-sm text-slate-500">No activity yet.</p>
        )}
      </div>
    </div>
  );
}

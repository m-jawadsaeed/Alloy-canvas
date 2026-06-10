interface Activity {
  id: string;

  message: string;
}

interface Props {
  activities: Activity[];
}

export default function ActivityFeed({
  activities,
}: Props) {
  return (
    <div>
      <h3>
        Activity Feed
      </h3>

      {activities.map(
        (activity) => (
          <div
            key={activity.id}
          >
            {
              activity.message
            }
          </div>
        )
      )}
    </div>
  );
}
export default function ActivityFeed() {
  const activities = [
    "Ahmed joined room",
    "Ali added rectangle",
    "Sara sent message",
    "Hamza edited canvas",
  ];

  return (
    <div className="p-4 space-y-3">
      {activities.map((item, index) => (
        <div
          key={index}
          className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

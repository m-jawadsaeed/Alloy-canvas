import { Link } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950">
      <div className="h-full px-6 flex items-center justify-between">
        <Link to="/dashboard" className="text-xl font-bold text-white">
          Alloy Canvas
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-slate-300">{user.username}</span>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="px-4 py-2 bg-red-500 rounded-lg text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

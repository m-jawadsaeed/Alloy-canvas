import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import api from "../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name,
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4">
      <div className="absolute w-96 h-96 bg-blue-500/20 blur-3xl rounded-full -left-32 top-0" />
      <div className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full bottom-0 right-0" />

      <div className="w-full max-w-lg relative z-10">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center">
              <UserPlus className="text-white" />
            </div>

            <h1 className="text-4xl font-bold text-white mt-4">
              Create Account
            </h1>

            <p className="text-slate-300 mt-2">Join Alloy Canvas</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              placeholder="Full Name"
              className="w-full bg-white/10 border border-white/10 text-white placeholder:text-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Username"
              className="w-full bg-white/10 border border-white/10 text-white placeholder:text-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-white/10 border border-white/10 text-white placeholder:text-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-white/10 border border-white/10 text-white placeholder:text-slate-300 rounded-xl px-4 py-3 pr-12 outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:scale-[1.02] transition"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-6 text-slate-300">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

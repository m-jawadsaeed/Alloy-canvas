import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        identifier: email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.account));

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-4">
      <div className="absolute w-96 h-96 bg-blue-600/20 blur-3xl rounded-full -top-20 -left-20" />
      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full bottom-0 right-0" />

      <div className="w-full max-w-md relative z-10">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-xl text-white">
              A
            </div>

            <h1 className="text-4xl font-bold text-white mt-5">Welcome Back</h1>

            <p className="text-slate-300 mt-2">
              Sign in to continue collaborating
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
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
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:scale-[1.02] transition"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-6 text-slate-300">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-cyan-400 font-semibold inline-flex items-center gap-1"
            >
              Create Account
              <ArrowRight size={16} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

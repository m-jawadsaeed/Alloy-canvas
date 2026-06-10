import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      navigate(
        "/dashboard"
      );
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
      }}
    >
      <div
        style={{
          width: "420px",
          padding: "40px",
          borderRadius: "20px",
          backdropFilter:
            "blur(20px)",
          background:
            "rgba(255,255,255,0.08)",
          border:
            "1px solid rgba(255,255,255,0.15)",
          color: "white",
          boxShadow:
            "0 25px 50px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            textAlign:
              "center",
            marginBottom:
              "10px",
          }}
        >
          Alloy Canvas
        </h1>

        <p
          style={{
            textAlign:
              "center",
            color: "#cbd5e1",
            marginBottom:
              "30px",
          }}
        >
          Collaborative Whiteboard
        </p>

        <form
          onSubmit={
            handleLogin
          }
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <button
            type="submit"
            style={buttonStyle}
          >
            Sign In
          </button>
        </form>

        <p
          style={{
            textAlign:
              "center",
            marginTop:
              "20px",
          }}
        >
          Don't have an
          account?{" "}
          <Link
            to="/register"
            style={{
              color:
                "#60a5fa",
            }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "10px",
  border:
    "1px solid rgba(255,255,255,0.15)",
  background:
    "rgba(255,255,255,0.08)",
  color: "white",
  outline: "none",
  boxSizing:
    "border-box" as const,
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "10px",
  background:
    "linear-gradient(90deg,#3b82f6,#2563eb)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};
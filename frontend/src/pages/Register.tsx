import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        await api.post(
          "/auth/register",
          {
            name,
            username,
            email,
            password,
          }
        );

        navigate(
          "/login"
        );
      } catch (error) {
        console.log(error);
        alert(
          "Registration failed"
        );
      }
    };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
      }}
    >
      <div
        style={{
          width: "450px",
          padding: "40px",
          borderRadius: "20px",
          backdropFilter:
            "blur(20px)",
          background:
            "rgba(255,255,255,0.08)",
          border:
            "1px solid rgba(255,255,255,0.15)",
          color: "white",
        }}
      >
        <h1
          style={{
            textAlign:
              "center",
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            textAlign:
              "center",
            color: "#cbd5e1",
            marginBottom:
              "25px",
          }}
        >
          Join Alloy Canvas
        </p>

        <form
          onSubmit={
            handleRegister
          }
        >
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
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
            Create Account
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
          Already have an
          account?{" "}
          <Link
            to="/login"
            style={{
              color:
                "#60a5fa",
            }}
          >
            Sign In
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
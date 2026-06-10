import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import userRoutes from "./routes/user.routes";
import statsRoutes from "./routes/stats.routes";
import canvasRoutes from "./routes/canvas.routes";
import roomRoutes from "./routes/room.routes";

import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/canvas", canvasRoutes);
app.use("/api/rooms", roomRoutes);

app.use(errorMiddleware);

export default app;
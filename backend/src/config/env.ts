import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  NODE_ENV: process.env.NODE_ENV || "development",

  DATABASE_URL: process.env.DATABASE_URL!,

  JWT_SECRET: process.env.JWT_SECRET!,

  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,

  REFRESH_SECRET: process.env.REFRESH_SECRET!,

  REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN!,

  CLIENT_URL: process.env.CLIENT_URL!,
};
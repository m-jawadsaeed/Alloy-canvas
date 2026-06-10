import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/db";

export const checkUsername = async (
  req: Request,
  res: Response
) => {
  const username = String(
  req.params.username
).toLowerCase();

  const existing = await prisma.user.findMany({
    where: {
      username,
    },
  });

  res.json({
    available: existing.length === 0,
  });
};

export const suggestUsername = async (
  req: Request,
  res: Response
) => {
  const base = String(req.params.name)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const suggestions: string[] = [];

  while (suggestions.length < 4) {
    const num = Math.floor(
      10 + Math.random() * 90
    );

    const candidate = `@${base}${num}`;

    const existing =
      await prisma.user.findMany({
        where: {
          username:
            candidate.replace("@", ""),
        },
      });

    if (existing.length === 0) {
      suggestions.push(candidate);
    }
  }

  res.json({ suggestions });
};

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("BODY:", req.body);

    const {
      name,
      username,
      email,
      password,
    } = req.body;

    const emailExists =
      await prisma.user.findUnique({
        where: {
          email: email.toLowerCase(),
        },
      });

    if (emailExists) {
      return res.status(400).json({
        error: "Email already registered",
      });
    }

    const usernameExists =
      await prisma.user.findFirst({
        where: {
          username: username
            .replace("@", "")
            .toLowerCase(),
        },
      });

    if (usernameExists) {
      return res.status(400).json({
        error: "Username already taken",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const account =
      await prisma.user.create({
        data: {
          name,
          username: username
            .replace("@", "")
            .toLowerCase(),
          email: email.toLowerCase(),
          password: hashedPassword,
        },
      });

    return res.json({
      message:
        "Account created successfully",
      account,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  const {
    identifier,
    password,
  } = req.body;

  const isEmail =
    identifier.includes("@") &&
    identifier.includes(".");

  const found = isEmail
    ? await prisma.user.findMany({
        where: {
          email:
            identifier.toLowerCase(),
        },
      })
    : await prisma.user.findMany({
        where: {
          username:
            identifier.replace(
              "@",
              ""
            ),
        },
      });

  if (found.length === 0) {
    return res.status(401).json({
      error: "Invaild Credentials",
    });
  }

  const account = found[0];

  const valid =
    await bcrypt.compare(
      password,
      account.password
    );

  if (!valid) {
    return res.status(401).json({
      error: "Invaild Credentials",
    });
  }

  res.json({
    message: "Login successful",
    account: {
      id: account.id,
      name: account.name,
      username: account.username,
      email: account.email,
    },
  });
};
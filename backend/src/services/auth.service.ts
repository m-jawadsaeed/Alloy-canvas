import prisma from "../config/db";

import {
  hashPassword,
  comparePassword,
} from "../utils/hash";

import { generateToken } from "../utils/jwt";

export class AuthService {
  async checkUsername(
    username: string
  ) {
    const user =
      await prisma.user.findFirst({
        where: {
          username:
            username.toLowerCase(),
        },
      });

    return !user;
  }

  async suggestUsername(
    name: string
  ) {
    const base = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    const suggestions: string[] = [];

    while (
      suggestions.length < 4
    ) {
      const random =
        Math.floor(
          Math.random() * 100
        );

      const username =
        `${base}${random}`;

      const exists =
        await prisma.user.findFirst({
          where: {
            username,
          },
        });

      if (!exists) {
        suggestions.push(
          `@${username}`
        );
      }
    }

    return suggestions;
  }

  async register(data: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) {
    const emailExists =
      await prisma.user.findUnique({
        where: {
          email:
            data.email.toLowerCase(),
        },
      });

    if (emailExists) {
      throw new Error(
        "Email already exists"
      );
    }

    const usernameExists =
      await prisma.user.findFirst({
        where: {
          username:
            data.username
              .replace("@", "")
              .toLowerCase(),
        },
      });

    if (usernameExists) {
      throw new Error(
        "Username already taken"
      );
    }

    const hashedPassword =
      await hashPassword(
        data.password
      );

    const account =
      await prisma.user.create({
        data: {
          name: data.name,
          username:
            data.username
              .replace("@", "")
              .toLowerCase(),
          email:
            data.email.toLowerCase(),
          password:
            hashedPassword,
        },
      });

    const token =
      generateToken(account.id);

    return {
      token,
      account,
    };
  }

  async login(
    identifier: string,
    password: string
  ) {
    const isEmail =
      identifier.includes("@");

    const account = isEmail
      ? await prisma.user.findUnique({
          where: {
            email:
              identifier.toLowerCase(),
          },
        })
      : await prisma.user.findFirst({
          where: {
            username:
              identifier.replace(
                "@",
                ""
              ),
          },
        });

    if (!account) {
      throw new Error(
        "Invalid credentials"
      );
    }

    const valid =
      await comparePassword(
        password,
        account.password
      );

    if (!valid) {
      throw new Error(
        "Invalid credentials"
      );
    }

    const token =
      generateToken(account.id);

    return {
      token,
      account,
    };
  }
}
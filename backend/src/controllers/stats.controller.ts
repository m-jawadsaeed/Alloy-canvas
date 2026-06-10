import { Request, Response } from "express";
import prisma from "../config/db";

export const getStats = async (
  req: Request,
  res: Response
) => {
  const [
    totalAccounts,
    activeUsers,
    totalMessages,
    totalRooms,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count(),
    prisma.message.count(),
    prisma.room.groupBy({
      by: ["id"],
    }),
  ]);

  res.json({
    totalAccounts,
    activeUsers,
    totalMessages,
    totalRooms:
      totalRooms.length,
  });
};
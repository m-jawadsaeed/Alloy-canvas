import { Request, Response } from "express";
import prisma from "../config/db";

export const getRooms = async (
  req: Request,
  res: Response
) => {
  const rooms =
    await prisma.room.groupBy({
      by: ["id"],
    });

  res.json(rooms);
};

export const getRoomInfo = async (
  req: Request,
  res: Response
) => {
  const { roomId } = req.params;

  const users =
    await prisma.room.findMany({
      where: {
        id: String(roomId),
      },
    });

  const messages =
    await prisma.message.count({
      where: {
        roomId: String(roomId),
      },
    });

  res.json({
    roomId: String(roomId),
    users: users.length,
    messages,
  });
};
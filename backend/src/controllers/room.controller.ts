import { Request, Response } from "express";
import prisma from "../config/db";

export const getRooms = async (req: Request, res: Response) => {
  const rooms = await prisma.room.groupBy({
    by: ["id"],
  });

  res.json(rooms);
};
export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const room = await prisma.room.create({
      data: {
        name,
        slug: crypto.randomUUID(),
      },
    });

    res.status(201).json(room);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create room",
    });
  }
};

export const getRoomInfo = async (req: Request, res: Response) => {
  const { roomId } = req.params;

  const users = await prisma.room.findMany({
    where: {
      id: String(roomId),
    },
  });

  const messages = await prisma.message.count({
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

import { Request, Response } from "express";
import prisma from "../config/db";

export const getRoomUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const { roomId } = req.params;

    const roomMembers =
      await prisma.roomMember.findMany({
        where: {
          roomId: String(roomId),
        },
        include: {
          user: true,
        },
        orderBy: {
          joinedAt: "asc",
        },
      });

    const users = roomMembers.map(
      (member) => member.user
    );

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message:
        "Failed to fetch room users",
    });
  }
};
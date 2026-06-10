import { Request, Response } from "express";
import prisma from "../config/db";

export const getMessages =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { roomId } =
        req.params;

      const messages =
        await prisma.message.findMany(
          {
            where: {
              roomId:
                String(
                  roomId
                ),
            },

            include: {
              user: {
                select: {
                  id: true,
                  username:
                    true,
                },
              },
            },

            orderBy: {
              createdAt:
                "asc",
            },
          }
        );

      res.json(
        messages
      );
    } catch (
      error
    ) {
      console.log(
        error
      );

      res.status(
        500
      ).json({
        message:
          "Failed to fetch messages",
      });
    }
  };
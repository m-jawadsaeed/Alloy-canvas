import prisma from "../config/db";

export class CanvasService {
  async getCanvas(
    roomId: string
  ) {
    return prisma.canvas.findUnique({
      where: {
        roomId,
      },
    });
  }

  async saveCanvas(
    roomId: string,
    data: string
  ) {
    return prisma.canvas.upsert({
      where: {
        roomId,
      },
      update: {
        data,
      },
      create: {
        roomId,
        data,
      },
    });
  }
}
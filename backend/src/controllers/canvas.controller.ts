import { Request, Response } from "express";
import { CanvasService } from "../services/canvas.service";

const canvasService =
  new CanvasService();

export const getCanvas =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const canvas =
        await canvasService.getCanvas(
          String(
            req.params.roomId
          )
        );

      res.json(canvas);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to load canvas",
      });
    }
  };

export const saveCanvas =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const canvas =
        await canvasService.saveCanvas(
          String(
            req.params.roomId
          ),
          req.body.data
        );

      res.json(canvas);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to save canvas",
      });
    }
  };
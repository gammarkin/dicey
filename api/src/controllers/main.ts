import { Request, Response } from "express";

export default {
    get: (_req: Request, res: Response) => 
  res.status(200).json({ ok: true }),
}

import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

export function requestId(req: Request, res: Response, next: NextFunction) {
  const id = randomUUID();
  req.id = id;
  res.setHeader("Request-ID", id);
  next();
}

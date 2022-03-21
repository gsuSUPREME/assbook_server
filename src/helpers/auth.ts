import { NextFunction, Request, Response } from "express";

export default async function verifySession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.userid)
    return res.status(401).json({ error: "Inicia sesión primero puta" });
  next();
}

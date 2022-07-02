import {NextFunction, Request, Response} from 'express';
/**
 * Middleware de autenticación para proteger rutas
 //SOLO EXPRESS
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {any}
 */
export default async function verifySession(
    req: Request,
    res: Response,
    next: NextFunction,
) {
  if (!req.session.userid) {
    return res.status(401).json({error: 'Inicia sesión primero puta'});
  }
  next();
}

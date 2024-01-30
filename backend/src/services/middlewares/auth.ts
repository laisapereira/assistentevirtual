import jwt  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

type TokenPayload = {
  id: string
  iat: number
  exp: number
}


export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token não encontrado" });
  }

  const [, token] = authorization.split(" ");
  try {
    const decode = jwt.verify(token, "secret");
    const { id } = decode as TokenPayload; // id de quem ta acessando isso aqui

    req.userId = id
    next()
    
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
    
  }
}

import jwt  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { getUserById } from '../controller/UserController/listAllUsers';
import { CreateUser } from '../controller/UserController/createUser';

type TokenPayload = {
  id: string
  iat: number
  exp: number
}


export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.cookies;

  if (!authorization) {
    return res.status(401).json({ message: "Token não encontrado" });
  }

  const [, token] = authorization.split(" ");
  try {
    const decode = jwt.verify(token, "secret");
    const { id } = decode as TokenPayload; // id de quem ta acessando isso aqui

    const user = await getUserById(Number(id)); 
    req.user = user as CreateUser | null;
    
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
    
  }
}

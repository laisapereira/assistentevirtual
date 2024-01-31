import prisma from "../../../utils/prisma"
import bycrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import createUser from "./createUser";
import { CreateUser } from "./createUser";
import { Request, Response} from "express";

export const loginController = async (req: Request, res: Response) => {

  const {email, password} = req.body;
  
  
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
    if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }
  
  try {
      const isValuePassword = await bycrypt.compare(password, user.password);
      if (!isValuePassword) {
        return res.status(401).json({ error: "Senha incorreta" });
      }
      const token = jwt.sign({ id: user.id }, "secret", {expiresIn: "1d"}) // so a aplicacao sabe o secret 
      const {id} = user
      return res.json({user: {id, email}, token});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Senha incorreta" });
      }
}

export const registerController = async (req: Request, res: Response) => {
  
  try {
    // instancia de Request
    const mockRequest = {} as Request<any, any, CreateUser>;
    mockRequest.body = req.body;
    await createUser(mockRequest, res);

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
   
  }
 
}

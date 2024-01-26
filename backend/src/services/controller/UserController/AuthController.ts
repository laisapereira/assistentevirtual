import prisma from "../../../utils/prisma"
import bycrypt from 'bcryptjs';
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const AuthController = async (req: Request, res: Response) => {

  const {email, password} = req.body;
  
  try {
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
        return res.json({user, token});

      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Identificação de senha correspondente falhou" });
      }
  
  } catch (error) {
    console.error(error);
  
  }
  
  }

  export default AuthController 
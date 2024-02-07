import prisma from "../../../utils/prisma";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createUser from "./createUser";
import { CreateUser } from "./createUser";
import { Request, Response } from "express";

/* const secret = process.env.SECRET_KEY || 'secret' as string; */

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

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
    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" }); // provide a default value for secret if it is undefined
    const { id } = user;

    res.cookie("token", token, { httpOnly: true });
    return res.json({ user: { id, email }, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "erro interno" });
  }
};

export const registerController = async (
  req: Request<CreateUser>,
  res: Response
) => {
  try {
    await createUser(req as Request<CreateUser>, res);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while registering the user." });
  }
};

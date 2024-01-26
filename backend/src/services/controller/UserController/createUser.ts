import { Request, Response } from "express";

import prisma from "../../../utils/prisma";



import bcrypt from 'bcryptjs';


interface CreateUser {
  email: string;
  password: string;
  name: string;
  departmentId: number;
}

const createUser = async (req: Request<CreateUser>, res: Response) => {
  const { email, password, name, departmentId } = req.body as CreateUser;

  try {
    const departmentExists = await prisma.department.findMany({
      where: { id: departmentId },
    });
    if (!departmentExists) {
      return res
        .status(400)
        .json({ error: "O departamento especificado não existe." });
    }

    const hash_password = await bcrypt.hash(password, 10)

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hash_password,
          name,
          /* departments: {
            connect: { id: departmentId },
          }, */
        },
      });

      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "erro ao criar o usuário" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "erro ao criar o usuário" });
  }

  return res.status(200).json({ message: "User created successfully" });
};

export default createUser;

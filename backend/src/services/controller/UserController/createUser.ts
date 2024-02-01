import { Request, Response } from "express";
import prisma from "../../../utils/prisma";
import bcrypt from "bcryptjs";

export interface CreateUser {
  email: string;
  password: string;
  name: string;
  departmentIds: number[];
  lead: string;
  ramal: string;
}

const createUser = async (req: Request<CreateUser>, res: Response) => {
  const { email, password, name, departmentIds, lead, ramal } = req.body as CreateUser;

  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) {
    return res.status(400).json({ error: "O usuário já existe." });
  }

  let createdUser;

  try {
    const hash_password = await bcrypt.hash(password, 10);
  
    createdUser = await prisma.user.create({
      data: {
        email,
        password: hash_password,
        name,
      },
    });
  
   
  
      if (!departmentExists) {
        return res
          .status(400)
          .json({ error: `O departamento com id ${departmentId} não existe.` });
      }
  
      await prisma.user_Department.create({
        data: {
          lead,
          ramal,
          user_id: createdUser.id,
          department_id: departmentId,
        },
      });
    }
  
    return res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
}
export default createUser;

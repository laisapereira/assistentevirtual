import { Request, Response } from "express";
import prisma from "../../prismaConfig";

const updateUser = async (req: Request, res: Response) => {
  const { id, name, email } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

export default updateUser;

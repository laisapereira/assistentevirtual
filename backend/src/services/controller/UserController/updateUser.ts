import { Request, Response } from "express";
import prisma from "../../../utils/prisma";

const updateUser = async (req: Request, res: Response) => {
  const { id, name, email } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update user" });
  }
};

export default updateUser;

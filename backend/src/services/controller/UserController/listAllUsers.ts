import prisma from "../../../utils/prisma";
import { Request, Response } from "express";

const listAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};

export default listAllUsers;

export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

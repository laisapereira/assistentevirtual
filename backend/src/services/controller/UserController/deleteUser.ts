import prisma from "../../../utils/prisma"
import { Request, Response } from "express";

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });

    return res.status(200).json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao excluir o usuário" });
  }
};

export default deleteUser;

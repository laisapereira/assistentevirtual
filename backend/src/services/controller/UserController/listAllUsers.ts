import  bcrypt  from 'bcryptjs';
import prisma from "../../../utils/prisma"
import { Request, Response } from "express";

const listAllUsers = async (req: Request, res: Response) => {

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
      const isValuePassword = await bcrypt.compare(password, user.password);
      if (!isValuePassword) {
        return res.status(401).json({ error: "Senha incorreta" });
      }
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch users" });
    }

} catch (error) {


}

}
export default listAllUsers;

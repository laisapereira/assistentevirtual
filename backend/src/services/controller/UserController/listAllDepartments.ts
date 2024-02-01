import { Request, Response } from 'express';
import prisma  from '../../../utils/prisma'

export default async function listAllDepartments(req: Request, res: Response) {
  const departments = await prisma.department.findMany();
  res.json(departments);
}
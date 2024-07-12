import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient()

async function handle() {
  const names = await prisma.$queryRaw`SELECT nome FROM Colaborador`;
  console.log(names);
}

await handle();
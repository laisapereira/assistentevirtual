const express = require('express');
const prisma = require('../db');
const router = express.Router();

export default async function login(req:Request, res:Response) {
  const { email, matricula } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        matricula,
      },
    });

    if (!usuario) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }
} catch (error: Error) {
    console.error('Erro ao processar a consulta:', error.message);
    return res.status(500).send('Erro ao processar a consulta.');
  }
    
}
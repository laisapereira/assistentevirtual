import prisma from '../prismaConfig';
import { Request, Response } from 'express';

const listAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export default listAllUsers;


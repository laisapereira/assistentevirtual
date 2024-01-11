import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createUser = async (userData: any) => {
    try {
        const user = await prisma.user.create({
            data: userData,
        });
        return user;
    } catch (error) {
        throw new Error(`Erro ao criar o usuário: ${error}`);
    }
};

export default createUser;

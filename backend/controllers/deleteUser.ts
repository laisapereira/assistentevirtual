import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteUser(userId: number) {
    try {
        await prisma.user.delete({
            where: {
                id: userId,
            },
        });
        console.log('Usuário deletado com sucesso!');
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
    } finally {
        await prisma.$disconnect();
    }
}

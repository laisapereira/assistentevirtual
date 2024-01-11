import prisma from "../prismaConfig";

async function listAllUsers() {
    try {
        const usuarios = await prisma.user.findMany();
        return usuarios;
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export default listAllUsers;

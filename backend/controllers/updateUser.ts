import { User } from ".prisma/client"; // Add this import statement
import prisma from "../prismaConfig";

async function updateUser(userId: number, data: Partial<User>) {
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data,
        });

        return user;
    } catch (error) {
        throw new Error(`Failed to update user: ${error}`);
    }
}

export default updateUser;

import { User } from './definitions';
import { prisma } from './prisma';

export async function getUserFromDb(email: string):  Promise<User | null> {
    
    const user = await prisma.user.findUnique({
        where: { email: email as string },
    });
    return user;
}
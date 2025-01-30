import { compare, hash } from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function saltAndHashPassword(password: string): Promise<string> {
    return await hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
}
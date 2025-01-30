import { z } from 'zod';

export const userSchema = z.object({
    id: z.string().optional(),
    password: z.string().min(8).max(100),
    username: z.string().optional(),
    email: z.string().email(),
})
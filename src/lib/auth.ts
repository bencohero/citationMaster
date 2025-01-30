import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

import { getUserFromDb } from '@/src/lib/db';
import { comparePassword } from "@/src/lib/password";
import { prisma } from "./prisma";

 


export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
          let user = null;

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required.");
        }

          // logic to verify if the user exists
          user = await getUserFromDb(credentials.email);

          if (!user) {
              // No user found, so this is their first attempt to login
              // Optionally, this is also the place you could do a user registration
              throw new Error("User not found.");
          }

          const isValid = await comparePassword(credentials.password, user.password);
                if (!isValid) {
                    throw new Error("Invalid password.");
                }
          // return user object with their profile data
          return {
            id: user.id ? user.id.toString() : "",
            email: user.email,
            name: user.username,
        };
      },
    }),
  ],
  pages: {
    signIn: '/signin',  // Displays signin buttons

    },
    callbacks: {
      async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
        return baseUrl; // ✅ Redirige toujours vers la page d'accueil `/`
      },
    },    
};